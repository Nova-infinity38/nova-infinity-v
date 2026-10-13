import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '../../db';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-09-30.endive',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`❌ Erreur de signature Webhook : ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`✅ Session Checkout validée pour : ${session.id}`);

      // 1. Mettre à jour la facture en base de données
      await db.invoice.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: 'paid' },
      }).catch((err) => console.error("Erreur maj facture :", err));

      // 2. Envoyer le mail de confirmation et bienvenue via Resend
      try {
        await resend.emails.send({
          from: 'Nova Infinity <onboarding@resend.dev>',
          to: session.customer_details?.email || 'artisan.test@nova-infinity.com',
          subject: 'Bienvenue sur Nova Infinity — Activation de votre compte',
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Félicitations et bienvenue sur Nova Infinity !</h2>
              <p>Votre règlement a bien été pris en compte.</p>
              <p>Notre équipe prépare votre espace client et prendra contact avec vous sous 48h pour finaliser l'installation sur-mesure.</p>
              <br/>
              <p>À très vite,<br/><strong>L'équipe Nova Infinity</strong></p>
            </div>
          `,
        });
        console.log(`📧 E-mail de confirmation envoyé avec succès !`);
      } catch (emailErr) {
        console.error("Erreur d'envoi du mail Resend :", emailErr);
      }

      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      console.log(`🔄 Abonnement mis à jour : ${subscription.id} (Statut: ${subscription.status})`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      console.log(`⚠️ Abonnement résilié : ${subscription.id}`);
      break;
    }

    default:
      console.log(`Événement non traité : ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}