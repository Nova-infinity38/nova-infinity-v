import Link from 'next/link';
import { db } from '../db'; // ou '@/lib/db' selon ton projet
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-09-30.endive',
});

export default async function SuccesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  let paymentStatus = 'en cours de vérification';

  if (sessionId) {
    try {
      // 1. Interrogation de Stripe pour vérifier l'état réel du paiement
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        paymentStatus = 'payé avec succès 🎉';

        // 2. Mise à jour de la facture dans Supabase via Prisma (statut pending -> paid)
        await db.invoice.update({
          where: { stripeSessionId: sessionId },
          data: { status: 'paid' },
        }).catch((err) => {
          console.log("Facture déjà mise à jour ou introuvable :", err.message);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la validation du paiement :", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Paiement validé !</h1>
        <p className="text-slate-600 text-sm mb-6">
          Merci pour votre confiance. Votre transaction a bien été enregistrée sur <span className="font-semibold text-slate-900">Nova Infinity</span>.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl mb-8 text-xs text-slate-500">
          Statut de la session : <span className="font-medium text-emerald-600">{paymentStatus}</span>
        </div>
        <Link 
          href="/" 
          className="inline-block w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-2xl transition shadow-md text-sm"
        >
          Retourner à l'accueil
        </Link>
      </div>
    </main>
  );
}