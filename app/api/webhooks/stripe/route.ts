import { NextResponse } from 'next/server';
import { headers as nextHeaders } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { logger } from '../../../../lib/logger';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-09-30.endive',
});

const resend = new Resend(process.env.RESEND_API_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const startTime = Date.now();
  const bodyText = await request.text();
  const headerList = await nextHeaders();
  const signature = headerList.get('stripe-signature');

  if (!signature) {
    logger.warn("Tentative de webhook Stripe sans signature détectée");
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret);
  } catch (err: any) {
    logger.error({ err: err.message }, "Échec de la validation de la signature du Webhook Stripe");
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  logger.info({ eventType: event.type, eventId: event.id }, "Webhook Stripe reçu et authentifié avec succès");

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!customerEmail) {
          logger.warn({ sessionId: session.id }, "Session Stripe complétée sans email client");
          break;
        }

        logger.info({ customerEmail, subscriptionId }, "Traitement de l'abonnement réussi (Checkout)");

        // --- 1. ENREGISTREMENT SUPABASE ---
        const { error: dbError } = await supabaseAdmin
          .from('subscriptions')
          .upsert({
            email: customerEmail,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: 'active',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'email' });

        if (dbError) {
          logger.error({ err: dbError.message }, "Erreur lors de l'enregistrement en base Supabase");
        } else {
          logger.info({ customerEmail }, "Client et abonnement synchronisés avec succès dans Supabase");
        }

        // --- 2. ENVOI DE L'EMAIL DE BIENVENUE VIA RESEND ---
        try {
          const emailResponse = await resend.emails.send({
            from: 'Nova Infinity <onboarding@resend.dev>', // Remplace par ton domaine validé sur Resend en prod
            to: [customerEmail],
            subject: 'Bienvenue sur Nova Infinity ! 🚀',
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Bienvenue à bord !</h2>
                <p>Bonjour,</p>
                <p>Nous sommes ravis de vous compter parmi les utilisateurs de <strong>Nova Infinity</strong>.</p>
                <p>Votre abonnement a bien été activé. Vous pouvez dès à présent accéder à votre espace et profiter de tous nos services.</p>
                <div style="margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://nova-infinity.fr'}/dashboard" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Accéder à mon tableau de bord</a>
                </div>
                <p>Si vous avez la moindre question, n'hésitez pas à répondre directement à cet e-mail.</p>
                <p>À très vite,<br><strong>L'équipe Nova Infinity</strong></p>
              </div>
            `,
          });

          logger.info({ customerEmail, emailId: emailResponse.data?.id }, "E-mail de bienvenue Resend envoyé avec succès");
        } catch (emailErr: any) {
          logger.error({ err: emailErr.message, customerEmail }, "Erreur lors de l'envoi de l'e-mail de bienvenue Resend");
        }

        break;
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        logger.info({ invoiceId: invoice.id }, "Facture payée avec succès");
        break;
      }

      default:
        logger.info({ eventType: event.type }, "Événement Stripe ignoré (non géré explicitement)");
    }

    const duration = Date.now() - startTime;
    logger.info({ route: '/api/webhooks/stripe', durationMs: duration }, "Webhook traité intégralement");

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    logger.error({ err: error.message, eventType: event.type }, "Erreur critique lors du traitement interne du Webhook Stripe");
    return NextResponse.json({ error: "Internal Server Error in Webhook processing" }, { status: 500 });
  }
}