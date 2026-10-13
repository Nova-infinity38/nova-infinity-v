'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { db } from './db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Version stable recommandée
});

// URL dynamique (s'adapte à Vercel ou en local)
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';

export async function createCheckoutSession(productName, unitAmount, mode = 'payment') {
  let sessionConfig = {};

  if (mode === 'subscription') {
    sessionConfig = {
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
      },
      payment_method_collection: 'always',
      success_url: `${baseUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    };
  } else {
    sessionConfig = {
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  if (session.url && session.id) {
    const customerEmail = "artisan.test@nova-infinity.com"; 

    try {
      const client = await db.client.upsert({
        where: { email: customerEmail },
        update: {},
        create: {
          email: customerEmail,
          name: "Artisan Test Nova",
        },
      });

      await db.invoice.create({
        data: {
          amount: unitAmount,
          productName: productName,
          status: 'pending',
          stripeSessionId: session.id,
          clientId: client.id,
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement Prisma :", error);
    }

    redirect(session.url);
  }
}