import Link from 'next/link';
import { createCheckoutSession } from './actions';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Banner / Logo */}
        <div className="pt-12 pb-8 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl shadow-xl mb-6">
            <span className="text-2xl font-black text-white tracking-tight">
              Nova <span className="text-indigo-400">Infinity</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            L'automatisation intelligente pour les pros du bâtiment et services
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Générez vos devis, suivez vos clients et pilotez votre activité professionnelle en toute sérénité grâce à notre modèle clé en main.
          </p>
        </div>

        {/* Main Container */}
        <section className="max-w-5xl mx-auto px-4 mt-4">
          <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
            
            {/* Badge Essai */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wider">
                ✨ 7 JOURS D'ESSAI OFFERT SUR L'ABONNEMENT
              </span>
              <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium text-xs px-4 py-2 rounded-full">
                Installation Sur-Mesure sous 48h
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white mb-6">
              1. Choisissez votre formule d'installation clé en main (Paiement unique) :
            </h2>

            {/* Grille des Packs (390€ & 499€) */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              
              {/* Pack Essentiel - 390 € */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">Pack Artisan Essentiel</h3>
                    <span className="text-xl font-black text-indigo-400">390 € HT</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    Idéal pour démarrer rapidement : paramétrage de votre charte, catalogue initial et intégration de vos premiers devis.
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2">✓ Générateur de devis instantané</li>
                    <li className="flex items-center gap-2">✓ Gestion des clients et acomptes CB</li>
                    <li className="flex items-center gap-2">✓ Support technique inclus</li>
                  </ul>
                </div>
                <form action={createCheckoutSession.bind(null, 'Pack Artisan Essentiel', 39000, 'payment')}>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 rounded-xl border border-slate-700 transition shadow">
                    Choisir l'Essentiel (390 €)
                  </button>
                </form>
              </div>

              {/* Pack PME Intégral - 499 € */}
              <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-400 transition shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Populaire
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">Pack PME Intégral</h3>
                    <span className="text-xl font-black text-indigo-400">499 € HT</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    Pour les professionnels exigeants : installation prioritaire, migration de données et formation personnalisée.
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2">✓ Tout le Pack Essentiel inclus</li>
                    <li className="flex items-center gap-2">✓ Migration de vos anciens fichiers</li>
                    <li className="flex items-center gap-2">✓ Formation visio personnalisée</li>
                  </ul>
                </div>
                <form action={createCheckoutSession.bind(null, 'Pack PME Intégral', 49900, 'payment')}>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/30">
                    Choisir l'Intégral (499 €)
                  </button>
                </form>
              </div>

            </div>

            {/* Abonnement Mensuel Rattaché (29€) */}
            <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/50 p-6 rounded-2xl border">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Abonnement Pro Infinity (Optionnel / Sans engagement)</h3>
                <p className="text-slate-400 text-xs">
                  Pour une automatisation complète (relances SMS/E-mails, portail client) : <span className="text-white font-bold">29 € HT / mois</span>. 7 jours d'essai offerts.
                </p>
              </div>

              <form action={createCheckoutSession.bind(null, 'Abonnement Pro Nova Infinity', 2900, 'subscription')} className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider whitespace-nowrap">
                  Démarrer l'essai 7 jours gratuits
                </button>
              </form>
            </div>

          </div>
        </section>
      </div>

      {/* Pied de Page / Footer avec Lien vers Mentions Légales & CGV */}
      <footer className="mt-20 pt-8 border-t border-slate-800/60 text-center text-xs text-slate-500 max-w-5xl mx-auto w-full px-4">
        <p className="mb-2">© 2026 Nova Infinity. Tous droits réservés.</p>
        <Link 
          href="/mentions-legales" 
          className="text-slate-400 hover:text-white underline transition"
        >
          Mentions Légales & CGV
        </Link>
      </footer>
    </main>
  );
}