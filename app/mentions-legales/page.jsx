import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mentions Légales & CGV</h1>
            <p className="text-slate-500 text-sm mt-1">Conformité réglementaire — Nova Infinity</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:underline">
            ← Retour au site
          </Link>
        </div>

        {/* Section 1 : Identification de l'entreprise */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Éditeur du site</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Le site <strong>Nova Infinity</strong> est édité par l'entreprise individuelle (Micro-entreprise) implantée à Grenoble, France.<br />
            <strong>Activité :</strong> Édition de logiciels applicatifs & solutions SaaS pour le BTP.<br />
            <strong>Inscriptions administrative :</strong> En cours d'immatriculation au Guichet Unique INPI / RNE.<br />
            <strong>Directeur de la publication :</strong> Le Fondateur de Nova Infinity.<br />
            <strong>Contact :</strong> contact@nova-infinity.com
          </p>
        </section>

        {/* Section 2 : Régime Fiscal & TVA */}
        <section className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">2. Régime Fiscal & TVA</h2>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            Conformément à l'article 293 B du Code Général des Impôts (CGI), la TVA est non applicable sur l'ensemble des prestations, packs d'installation et abonnements proposés par Nova Infinity. Tous les prix sont indiqués en Euros Net à payer (HT = TTC).
          </p>
        </section>

        {/* Section 3 : Hébergement & Données */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Hébergement & Sécurité des Données</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>Hébergement d'application :</strong> Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br />
            <strong>Base de données :</strong> Supabase Inc., sécurisée selon les normes ISO 27001 et conforme RGPD.<br />
            <strong>Traitement des paiements :</strong> Stripe Payments Europe, Ltd. L'éditeur ne conserve aucune donnée bancaire sur ses serveurs.
          </p>
        </section>

        {/* Section 4 : CGV et Résiliation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Conditions Générales de Vente (CGV)</h2>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
            <p><strong>Packs d'Installation Clé en Main (390 € / 499 €) :</strong> Prestation de service unique comprenant la configuration initiale, la personnalisation et l'accès au portail. Prestation exécutée sous 48h ouvrées après confirmation de commande.</p>
            <p><strong>Abonnement SaaS Pro (29 €/mois) :</strong> Service mensuel sans engagement de durée. Le client peut interrompre son abonnement à tout moment depuis son espace client ou sur simple demande par mail.</p>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          Dernière mise à jour : Octobre 2026 — Nova Infinity Grenoble.
        </div>

      </div>
    </main>
  );
}