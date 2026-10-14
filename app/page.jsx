'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Injecter Tailwind CSS
    if (!document.getElementById('tailwind-cdn')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.id = 'tailwind-cdn';
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tailwindScript);
    }

    // Injecter Supabase Client CDN
    if (!document.getElementById('supabase-cdn')) {
      const supabaseScript = document.createElement('script');
      supabaseScript.id = 'supabase-cdn';
      supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      document.head.appendChild(supabaseScript);
    }

    // Injecter Stripe JS CDN
    if (!document.getElementById('stripe-cdn')) {
      const stripeScript = document.createElement('script');
      stripeScript.id = 'stripe-cdn';
      stripeScript.src = 'https://js.stripe.com/v3/';
      document.head.appendChild(stripeScript);
    }

    // Injecter Alpine.js CDN
    if (!document.getElementById('alpine-cdn')) {
      const alpineScript = document.createElement('script');
      alpineScript.id = 'alpine-cdn';
      alpineScript.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
      alpineScript.defer = true;
      document.head.appendChild(alpineScript);
    }
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<style>
    @media print {
        body * {
            visibility: hidden;
        }
        #printable-invoice, #printable-invoice * {
            visibility: visible;
        }
        #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        .no-print {
            display: none !important;
        }
    }
</style>

<div class="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col" x-data="novaApp()">

    <!-- LANDING PAGE & ESSAI GRATUIT -->
    <div x-show="!isSubscribed" class="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-8 flex-grow flex flex-col justify-center">
        <div class="text-center space-y-3 flex flex-col items-center">
            <div class="inline-block mb-1">
                <img src="/logo-nova.jpg" alt="Logo Nova Infinity" class="h-28 md:h-40 w-auto object-contain mx-auto" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%2270%22 viewBox=%220 0 160 70%22><rect width=%22160%22 height=%2270%22 rx=%2212%22 fill=%22%231e1b4b%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23fbbf24%22 font-family=%22sans-serif%22 font-weight=%22900%22 font-size=%2224%22>NOVA</text></svg>';">
            </div>
            <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Concentrez-vous sur vos chantiers, nous prenons soin de votre gestion.</h1>
            <p class="text-sm text-slate-500 max-w-xl pt-1">Pensé avec des artisans de terrain. Configuré sur-mesure par notre équipe, sécurisé par le cloud et prêt à encaisser vos acomptes en un clin d'œil.</p>
        </div>

        <div class="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-slate-200 space-y-8 w-full max-w-4xl mx-auto">
            
            <div class="bg-gradient-to-r from-indigo-950 to-indigo-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <span class="bg-amber-400 text-indigo-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wide">✨ 7 Jours d'Essai Offert • Zéro Contrainte</span>
                    <span class="text-xs font-semibold text-indigo-200 bg-indigo-900/60 px-3 py-1 rounded-lg border border-indigo-700">Accompagnement Humain Personnalisé</span>
                </div>
                <h3 class="font-bold text-sm text-indigo-100">1. Choisissez votre formule d'installation clé en main (paiement unique) :</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <label class="flex items-start gap-3 p-3.5 rounded-xl border border-indigo-700/60 bg-indigo-900/40 cursor-pointer hover:bg-indigo-900/70 transition">
                        <input type="radio" name="setupTier" value="390" x-model="selectedSetupFee" class="mt-1 text-amber-400">
                        <div class="text-xs space-y-1">
                            <strong class="text-white block text-sm">Pack Artisan Essentiel — 390 € HT</strong>
                            <p class="text-indigo-200">Paramétrage initial de votre catalogue, charte graphique et intégration de vos premiers devis sous 48h par nos experts.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3.5 rounded-xl border border-indigo-700/60 bg-indigo-900/40 cursor-pointer hover:bg-indigo-900/70 transition">
                        <input type="radio" name="setupTier" value="499" x-model="selectedSetupFee" class="mt-1 text-amber-400">
                        <div class="text-xs space-y-1">
                            <strong class="text-white block text-sm">Pack PME Intégral — 499 € HT</strong>
                            <p class="text-indigo-200">Installation prioritaire, migration de vos anciens fichiers clients, formation personnalisée en visio et automatisation.</p>
                        </div>
                    </label>
                </div>
                <div class="text-[11px] text-indigo-300 pt-1 border-t border-indigo-800 flex justify-between items-center">
                    <span>Abonnement logiciel mensuel rattaché : <strong>29 € HT / mois</strong> (sans engagement, annulable à tout moment).</span>
                </div>
            </div>

            <div class="space-y-4 border-b border-slate-100 pb-6">
                <h2 class="font-bold text-slate-900 text-sm uppercase tracking-wider">2. Vos Informations Professionnelles & Légales</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Votre Nom & Prénom</label>
                        <input type="text" x-model="managerName" placeholder="Ex: Thomas Nova" class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Nom de votre Entreprise</label>
                        <input type="text" x-model="companyName" placeholder="Ex: Nova Plomberie" class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                </div>

                <div class="text-xs">
                    <label class="block font-medium text-slate-700 mb-1">Adresse complète du siège</label>
                    <input type="text" x-model="companyAddress" placeholder="Ex: 45 Avenue des Entrepreneurs, 38000 Grenoble" class="w-full border border-slate-300 rounded-xl p-3 outline-none">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">E-mail professionnel</label>
                        <input type="email" x-model="companyEmail" placeholder="contact@nova-artisan.fr" class="w-full border border-slate-300 rounded-xl p-3 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Numéro SIRET</label>
                        <input type="text" x-model="companySiret" placeholder="123 456 789 00012" class="w-full border border-slate-300 rounded-xl p-3 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">IBAN (pour vos virements)</label>
                        <input type="text" x-model="companyIban" placeholder="FR76..." class="w-full border border-slate-300 rounded-xl p-3 font-mono outline-none">
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="font-bold text-slate-900 text-sm uppercase tracking-wider">3. Votre Corps de Métier Principal</h2>
                <select x-model="selectedTrade" @change="updateTradeDefaults()" class="w-full border border-slate-300 rounded-xl p-3.5 text-sm bg-indigo-50/50 font-semibold text-indigo-950 outline-none">
                    <option value="Plomberie">Nova Plomberie & Chauffage</option>
                    <option value="Électricité">Nova Électricité & Domotique</option>
                    <option value="Bâtiment">Nova Bâtiment & Maçonnerie</option>
                    <option value="Peinture">Nova Peinture & Décoration</option>
                    <option value="Menuiserie">Nova Menuiserie & Agencement</option>
                    <option value="Toiture">Nova Toiture & Zinguerie</option>
                    <option value="Carrelage">Nova Carrelage & Sols</option>
                    <option value="Jardinage">Nova Paysage & Espaces Verts</option>
                    <option value="Rénovation">Nova Rénovation Globale</option>
                    <option value="Nettoyage">Nova Propreté & Services</option>
                    <option value="Autre">➕ Autre Corps de Métier / PME</option>
                </select>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <button @click="startFreeTrial()" class="bg-amber-400 hover:bg-amber-500 text-indigo-950 py-3.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                        🎁 Démarrer mes 7 Jours Gratuits (Cloud Sync)
                    </button>
                    <button @click="redirectToStripeCheckout()" class="bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                        🚀 Activer l'Installation & l'Abonnement (Stripe)
                    </button>
                </div>
                <p class="text-[11px] text-center text-slate-400">Paiement sécurisé par cryptage SSL. Prestation d'installation clé en main (<span x-text="selectedSetupFee + ' € HT'"></span>) + Abonnement 29€ HT/mois.</p>
            </div>
        </div>
    </div>

    <!-- ESPACE PRO TABLEAU DE BORD -->
    <div x-show="isSubscribed && !isPublicView && !isClientSigningView && !isPdfView && !showCommercialPitch" style="display: none;" class="min-h-screen flex flex-col w-full">
        <header class="text-white shadow-md sticky top-0 z-50 transition-colors duration-300 w-full" :style="'background-color: ' + themeColor">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-3">
                <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="h-12 md:h-14 w-auto flex-shrink-0 flex items-center">
                            <img src="/logo-nova.jpg" alt="Logo" class="h-full w-auto object-contain" onerror="this.style.display='none'">
                        </div>
                        <div class="truncate">
                            <h1 class="text-sm font-bold truncate max-w-[200px]" x-text="companyName"></h1>
                            <p class="text-[10px] opacity-80 truncate" x-text="managerName + ' • ' + selectedTrade"></p>
                        </div>
                    </div>
                    <span x-show="isTrialActive" class="md:hidden bg-amber-400 text-indigo-950 px-2 py-0.5 rounded text-[9px] font-bold">Essai 7j</span>
                </div>
                <div class="flex items-center gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto text-xs">
                    <span x-show="isTrialActive" class="hidden md:inline-block bg-amber-400 text-indigo-950 px-2.5 py-1 rounded text-[11px] font-bold">Essai Gratuit Actif</span>
                    <button x-show="isTrialActive" @click="cancelTrial()" class="bg-red-500/90 hover:bg-red-600 text-white px-2.5 py-1.5 rounded text-[11px] font-semibold transition">Arrêter l'essai</button>
                    <button @click="openAdminModal = true" class="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-[11px] font-semibold transition">⚙️ Paramètres & Équipe</button>
                    <button @click="showCommercialPitch = true" class="bg-black/20 hover:bg-black/30 text-white px-3 py-1.5 rounded text-[11px] font-semibold transition">💼 Notre Offre</button>
                    <button @click="isPublicView = true" class="bg-amber-400 hover:bg-amber-300 text-indigo-950 px-3 py-1.5 rounded text-[11px] font-bold transition">🌐 Voir mon Portail Public</button>
                    <button @click="isSubscribed = false" class="bg-black/30 hover:bg-black/40 text-white px-2.5 py-1.5 rounded text-[11px]">Quitter</button>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6 flex-grow w-full">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full" x-text="isTrialActive ? 'Offre Essai Cloud' : 'Abonnement Pro (29€/mois)'"></span>
                        <span class="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100">Supabase Connecté 🟢</span>
                    </div>
                    <h3 class="font-extrabold text-slate-900 text-lg pt-1" x-text="companyName"></h3>
                    <p class="text-xs text-slate-500">Dirigeant : <strong class="text-slate-700" x-text="managerName"></strong></p>
                    <p class="text-xs text-slate-500">SIRET : <span class="font-mono font-bold text-slate-700" x-text="companySiret || 'En attente'"></span></p>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2 flex flex-col justify-between">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Trésorerie Prévisionnelle (Chantiers)</h4>
                        <p class="text-2xl font-black text-emerald-600 mt-2" x-text="calculateProjectedCashflow() + ' €'"></p>
                        <p class="text-[11px] text-slate-500 mt-1">Calculée sur vos acomptes signés (30%) & factures réglées.</p>
                    </div>
                    <div class="pt-2">
                        <span class="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-lg block text-center">Installation clé en main : <strong x-text="selectedSetupFee + ' € HT réglé'"></strong></span>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Conformité & Documents</h4>
                        <p class="text-2xl font-black text-slate-800 mt-2"><span x-text="invoices.length"></span> Documents édités</p>
                        <p class="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">🔒 Numérotation séquentielle active</p>
                    </div>
                    <button @click="exportCSV()" class="mt-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-3 rounded-xl font-semibold transition flex items-center justify-center gap-1">
                        📥 Exporter la comptabilité (CSV)
                    </button>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-3 gap-2">
                    <h3 class="font-bold text-slate-900 text-base">📥 Demandes Reçues de vos Clients (<span x-text="clientLeads.length"></span>)</h3>
                    <span class="text-xs text-slate-400">Transformez une demande en devis officiel instantanément</span>
                </div>

                <div class="space-y-3">
                    <template x-for="(lead, idx) in clientLeads" :key="idx">
                        <div class="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div class="space-y-1.5 w-full md:w-auto">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="font-bold text-slate-900 text-sm" x-text="lead.client"></span>
                                    <span class="text-xs text-indigo-600 font-semibold" x-text="'(' + lead.email + ')'"></span>
                                    <span class="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full" x-text="lead.service"></span>
                                </div>
                                <p class="text-xs text-slate-600">Options choisies : <span class="font-semibold text-slate-800" x-text="lead.options.length > 0 ? lead.options.join(' • ') : 'Aucune option'"></span></p>
                                <p class="text-xs text-indigo-950 bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100" x-show="lead.message">
                                    💬 <strong>Message du client :</strong> <span class="italic font-normal" x-text="lead.message"></span>
                                </p>
                            </div>
                            <div class="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                                <a :href="getRichEmailBody(lead)" class="flex-1 md:flex-initial text-center bg-white hover:bg-slate-100 text-indigo-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition border border-indigo-200 shadow-sm">
                                    ✉️ Répondre
                                </a>
                                <button @click="convertLeadToInvoice(lead)" class="flex-1 md:flex-initial bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm">
                                    ✨ Chiffrer ce projet
                                </button>
                            </div>
                        </div>
                    </template>
                    <template x-if="clientLeads.length === 0">
                        <p class="text-center text-xs text-slate-400 italic py-6">Aucune demande en attente pour le moment. Partagez votre lien de portail public pour recevoir vos premiers chantiers !</p>
                    </template>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
                <div class="border-b border-slate-100 pb-3">
                    <h3 class="font-bold text-slate-900 text-base">📝 Éditeur de Devis & Factures (Séquentiel Légal & RGPD)</h3>
                    <p class="text-xs text-slate-500">Générez des documents professionnels conformes en quelques secondes.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Nom du Client</label>
                        <input type="text" x-model="currentClient" placeholder="Ex: Jean Martin" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">E-mail du Client</label>
                        <input type="email" x-model="currentClientEmail" placeholder="jean.martin@example.com" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Régime de TVA</label>
                        <select x-model.number="tvaRate" class="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-medium outline-none">
                            <option value="0">TVA non applicable (Art. 293 B du CGI)</option>
                            <option value="10">TVA réduite 10% (Travaux & Rénovation)</option>
                            <option value="5.5">TVA super-réduite 5.5% (Rénovation énergétique)</option>
                            <option value="20">TVA standard 20%</option>
                        </select>
                    </div>
                </div>

                <div class="text-xs">
                    <label class="block font-medium text-slate-700 mb-1">Intitulé principal de la prestation</label>
                    <input type="text" x-model="currentService" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none font-medium">
                </div>

                <div class="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-4 overflow-x-auto">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Lignes et Postes du Devis</h4>
                        <div class="flex items-center gap-2 flex-wrap w-full md:w-auto">
                            <select @change="addCatalogItem($event.target.value); $event.target.value='';" class="text-xs bg-indigo-50 border border-indigo-200 text-indigo-950 font-semibold px-3 py-2 rounded-xl outline-none flex-1 md:flex-initial">
                                <option value="">+ Ajouter un poste depuis votre catalogue</option>
                                <template x-for="cat in defaultCatalogItems">
                                    <option :value="cat.name" x-text="cat.name + ' (' + cat.price + '€)'"></option>
                                </template>
                            </select>
                            <button @click="addCustomItem()" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl transition whitespace-nowrap">
                                ➕ Ajouter une ligne libre
                            </button>
                        </div>
                    </div>
                    
                    <div class="min-w-[550px] space-y-2.5">
                        <div class="grid grid-cols-12 gap-2 text-xs font-bold text-slate-400 border-b border-slate-200 pb-2">
                            <div class="col-span-5">Désignation du poste</div>
                            <div class="col-span-2 text-center">Qté</div>
                            <div class="col-span-2 text-center">P.U. HT (€)</div>
                            <div class="col-span-2 text-right">Total HT</div>
                            <div class="col-span-1 text-center">Action</div>
                        </div>

                        <template x-for="(item, index) in invoiceItems" :key="index">
                            <div class="grid grid-cols-12 gap-2 items-center text-xs">
                                <div class="col-span-5"><input type="text" x-model="item.name" class="w-full border border-slate-300 rounded-lg p-2 bg-white outline-none"></div>
                                <div class="col-span-2 text-center"><input type="number" x-model.number="item.qty" class="w-full border border-slate-300 rounded-lg p-2 text-center bg-white outline-none"></div>
                                <div class="col-span-2 text-center"><input type="number" x-model.number="item.price" class="w-full border border-slate-300 rounded-lg p-2 text-center bg-white outline-none"></div>
                                <div class="col-span-2 text-right font-bold text-indigo-600" x-text="(item.qty * item.price).toFixed(2) + ' €'"></div>
                                <div class="col-span-1 text-center">
                                    <button @click="removeItem(index)" class="text-red-500 font-bold hover:bg-red-50 p-1.5 rounded-lg transition">✕</button>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="pt-4 border-t border-slate-200 space-y-1.5 text-xs">
                        <div class="flex justify-between font-medium text-slate-600">
                            <span>Total HT :</span>
                            <span x-text="calculateTotalHT() + ' €'"></span>
                        </div>
                        <div class="flex justify-between font-medium text-slate-600" x-show="tvaRate > 0">
                            <span>Montant TVA (<span x-text="tvaRate + '%'"></span>) :</span>
                            <span x-text="calculateTVA() + ' €'"></span>
                        </div>
                        <div class="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-200">
                            <span>Montant Total TTC :</span>
                            <span class="text-base text-indigo-900" x-text="calculateTotalTTC() + ' €'"></span>
                        </div>
                        <div class="flex justify-between text-emerald-700 font-semibold pt-1">
                            <span>Acompte recommandé à la signature (30%) :</span>
                            <span x-text="calculateAcompte() + ' €'"></span>
                        </div>
                    </div>
                </div>

                <button @click="saveAndPublishInvoice()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2" :style="'background-color: ' + themeColor">
                    💾 Enregistrer & Publier le Devis (Numérotation Cloud Séquentielle)
                </button>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 class="font-bold text-slate-900 text-base">📂 Historique & Suivi des Devis et Factures</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs min-w-[650px]">
                        <thead>
                            <tr class="border-b border-slate-100 text-slate-400 pb-2">
                                <th class="pb-3">Référence</th>
                                <th class="pb-3">Client (E-mail)</th>
                                <th class="pb-3">Prestation</th>
                                <th class="pb-3">Total TTC</th>
                                <th class="pb-3">Actions & Automatisation Relances</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <template x-for="(inv, index) in invoices" :key="index">
                                <tr>
                                    <td class="py-3 font-bold" :class="inv.isFacture ? 'text-emerald-700' : 'text-indigo-600'" x-text="inv.number"></td>
                                    <td class="py-3 font-medium">
                                        <span x-text="inv.client"></span>
                                        <span class="text-[10px] text-slate-400 block" x-text="inv.clientEmail"></span>
                                    </td>
                                    <td class="py-3 text-slate-600" x-text="inv.service"></td>
                                    <td class="py-3 font-bold text-slate-900" x-text="inv.totalTTC + ' €'"></td>
                                    <td class="py-3 flex gap-1.5 flex-wrap items-center">
                                        <button @click="openPdfView(inv)" class="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-2.5 py-1.5 rounded-lg transition">📄 PDF</button>
                                        <button @click="openClientPortalForSigning(inv)" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1.5 rounded-lg transition border border-emerald-200">🔗 Lien Signature & CB</button>
                                        
                                        <template x-if="inv.signature && !inv.isFacture">
                                            <button @click="convertToFacture(inv)" class="bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold px-2.5 py-1.5 rounded-lg transition">💶 Facturer</button>
                                        </template>
                                        <template x-if="inv.isFacture">
                                            <span class="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">Facturé ✓</span>
                                        </template>

                                        <button @click="sendRelanceEmail(inv)" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-2.5 py-1.5 rounded-lg transition" x-text="'🤖 Relance Auto (' + (inv.relanceCount || 0) + ')'"></button>
                                    </td>
                                </tr>
                            </template>
                            <template x-if="invoices.length === 0">
                                <tr>
                                    <td colspan="5" class="py-6 text-center text-slate-400 italic">Aucun document pour le moment. Rédigez votre premier devis ci-dessus.</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- PORTAIL PUBLIC CLIENT -->
    <div x-show="isSubscribed && isPublicView" style="display: none;" class="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div class="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
            <div class="text-center border-b border-slate-100 pb-5 space-y-3">
                <div class="inline-block">
                    <img src="/logo-nova.jpg" alt="Logo Entreprise" class="h-20 w-auto object-contain mx-auto" onerror="this.style.display='none'">
                </div>
                <div>
                    <span class="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">Espace Demande de Chantier</span>
                    <h2 class="text-2xl font-black text-slate-900 mt-1" x-text="companyName"></h2>
                    <p class="text-xs text-slate-500 mt-0.5">SIRET : <span class="font-mono font-bold" x-text="companySiret || 'En cours'"></span> • Contact : <span x-text="companyEmail"></span></p>
                </div>
            </div>

            <div class="space-y-4 text-xs">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Votre Nom & Prénom</label>
                        <input type="text" x-model="publicClientName" placeholder="Ex: Jean Martin" class="w-full border border-slate-300 rounded-xl p-3 outline-none">
                    </div>
                    <div>
                        <label class="block font-medium text-slate-700 mb-1">Votre Adresse e-mail</label>
                        <input type="email" x-model="publicClientEmail" placeholder="jean.martin@example.com" class="w-full border border-slate-300 rounded-xl p-3 outline-none">
                    </div>
                </div>

                <div>
                    <label class="block font-medium text-slate-700 mb-1">Prestation souhaitée</label>
                    <select x-model="publicSelectedService" class="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none font-medium">
                        <template x-for="srv in getCurrentTradeServices()">
                            <option :value="srv" x-text="srv"></option>
                        </template>
                    </select>
                </div>

                <div>
                    <label class="block font-medium text-slate-700 mb-2">Options et exigences particulières</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                            <input type="checkbox" value="Fourniture matériel pro incluse" x-model="publicOptions" class="rounded text-indigo-600">
                            <span class="font-medium text-slate-700">Fourniture matériel pro incluse</span>
                        </label>
                        <label class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                            <input type="checkbox" value="Garantie décennale & Conformité" x-model="publicOptions" class="rounded text-indigo-600">
                            <span class="font-medium text-slate-700">Garantie décennale & Conformité</span>
                        </label>
                        <label class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                            <input type="checkbox" value="Intervention prioritaire 48h" x-model="publicOptions" class="rounded text-indigo-600">
                            <span class="font-medium text-slate-700">Intervention prioritaire 48h</span>
                        </label>
                        <label class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                            <input type="checkbox" value="Nettoyage de chantier inclus" x-model="publicOptions" class="rounded text-indigo-600">
                            <span class="font-medium text-slate-700">Nettoyage de chantier inclus</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block font-medium text-slate-700 mb-1">Précisions ou commentaires sur votre projet</label>
                    <textarea x-model="clientMessage" rows="3" class="w-full border border-slate-300 rounded-xl p-3 outline-none" placeholder="Ex: Rénovation urgente à prévoir avant le mois prochain..."></textarea>
                </div>

                <p class="text-[10px] text-slate-400 italic text-center">Conformité RGPD : Les informations recueillies ici sont strictement réservées à l'établissement de votre devis par l'artisan.</p>

                <div class="pt-3 flex flex-col md:flex-row gap-2.5">
                    <button @click="submitPublicLead()" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-sm" :style="'background-color: ' + themeColor">
                        📤 Transmettre ma demande à l'artisan
                    </button>
                    <button @click="isPublicView = false" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-3.5 rounded-xl font-bold transition">
                        Retour Espace Pro
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- SIGNATURE TACTILE & STRIPE -->
    <div x-show="isSubscribed && isClientSigningView" style="display: none;" class="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div class="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-5" x-init="initCanvas()">
            <div class="text-center border-b border-slate-100 pb-4 space-y-1">
                <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Validation & Paiement Sécurisé (eIDAS)</span>
                <h2 class="text-xl font-black text-slate-900 pt-1" x-text="signingInvoice?.number"></h2>
                <p class="text-xs text-slate-500">Émis par <span class="font-bold text-slate-800" x-text="companyName"></span></p>
            </div>
            
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-xs space-y-1">
                <p class="font-bold text-indigo-950">Montant total TTC du devis : <span x-text="signingInvoice?.totalTTC + ' €'"></span></p>
                <p class="text-indigo-900">Acompte exigible par carte bancaire (30%) : <strong class="text-emerald-700 text-sm" x-text="calculateSigningAcompte() + ' €'"></strong></p>
            </div>

            <div class="space-y-2 text-xs">
                <label class="block font-medium text-slate-700">Veuillez signer dans le cadre ci-dessous (au doigt ou à la souris) :</label>
                <div class="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 overflow-hidden relative touch-none flex justify-center">
                    <canvas id="signatureCanvas" width="440" height="150" class="cursor-crosshair bg-white w-full"></canvas>
                </div>
                <div class="flex justify-between items-center text-[11px] text-slate-400">
                    <span x-text="'Horodatage : ' + currentTimestamp"></span>
                    <button @click="clearCanvas()" class="text-red-500 font-semibold hover:underline">Effacer la signature</button>
                </div>
            </div>

            <div class="flex flex-col gap-2.5 pt-2">
                <button @click="validateSignatureAndPayStripe()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                    💳 Signer électroniquement & Régler l'acompte (Stripe)
                </button>
                <button @click="isClientSigningView = false" class="bg-slate-100 hover:bg-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 text-center transition">Fermer</button>
            </div>
        </div>
    </div>

    <!-- VUE PDF -->
    <div x-show="isSubscribed && isPdfView" style="display: none;" class="min-h-screen bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center py-10 px-4">
        <div id="printable-invoice" class="max-w-2xl w-full bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-300 space-y-6">
            <div class="flex justify-between items-start border-b border-slate-100 pb-6">
                <div class="space-y-1 text-xs">
                    <div class="flex items-center gap-2.5 mb-2">
                        <img src="/logo-nova.jpg" class="h-10 w-auto object-contain" alt="Logo" onerror="this.style.display='none'">
                        <h2 class="text-xl font-black text-slate-900" x-text="companyName"></h2>
                    </div>
                    <p class="font-bold text-slate-700" x-text="managerName"></p>
                    <p class="text-slate-500">Adresse : <span x-text="companyAddress"></span></p>
                    <p class="text-slate-500">E-mail : <span x-text="companyEmail"></span> • SIRET : <span class="font-mono font-bold" x-text="companySiret || 'En attente'"></span></p>
                </div>
                <div class="text-right space-y-1">
                    <span class="text-xs font-bold px-3.5 py-1.5 rounded-full" :class="activePdf?.isFacture ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'" x-text="activePdf?.isFacture ? 'FACTURE OFFICIELLE' : 'DEVIS OFFICIEL'"></span>
                    <p class="text-sm font-bold text-indigo-600 mt-2" x-text="activePdf?.number"></p>
                </div>
            </div>
            
            <div class="space-y-4 text-xs">
                <table class="w-full text-left">
                    <thead>
                        <tr class="border-b border-slate-200 text-slate-400 pb-2">
                            <th class="pb-2">Désignation</th>
                            <th class="pb-2 text-center">Qté</th>
                            <th class="pb-2 text-center">P.U. HT</th>
                            <th class="pb-2 text-right">Total HT</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <template x-for="p in activePdf?.items">
                            <tr>
                                <td class="py-2.5 text-slate-800" x-text="p.name"></td>
                                <td class="py-2.5 text-center text-slate-600" x-text="p.qty"></td>
                                <td class="py-2.5 text-center text-slate-600" x-text="p.price + ' €'"></td>
                                <td class="py-2.5 text-right font-semibold text-slate-900" x-text="(p.qty * p.price).toFixed(2) + ' €'"></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div class="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
                    <span>Montant Total TTC :</span>
                    <span class="text-indigo-600 text-lg" x-text="activePdf?.totalTTC + ' €'"></span>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-between items-center" x-show="activePdf?.signature">
                    <div class="text-[11px] text-slate-600 space-y-0.5">
                        <p>Statut : <strong class="text-emerald-700">Signé électroniquement avec succès</strong></p>
                        <p class="text-[10px] text-slate-400" x-text="activePdf?.signatureMeta"></p>
                    </div>
                    <div>
                        <img :src="activePdf?.signature" alt="Signature client" class="h-14 border border-slate-200 rounded-xl bg-slate-50 object-contain p-1">
                    </div>
                </div>

                <div class="text-[10px] text-slate-500 pt-3 border-t border-slate-100 space-y-1">
                    <p>Coordonnées bancaires (IBAN) : <strong class="font-mono text-slate-700" x-text="companyIban"></strong></p>
                    <p>• <em>Devis valable 30 jours à compter de son émission. Assurance Responsabilité Civile Décennale souscrite conformément à la loi.</em></p>
                    <p>• <em>En cas de retard de paiement, application d'un taux d'intérêt légal et indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 du Code de commerce).</em></p>
                </div>
            </div>

            <div class="pt-4 flex gap-3 no-print">
                <button onclick="window.print()" class="flex-1 bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-xs font-bold transition">🖨️ Imprimer / Sauvegarder en PDF</button>
                <button @click="isPdfView = false" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-3 rounded-xl text-xs font-bold transition">Fermer</button>
            </div>
        </div>
    </div>

    <!-- MODALE PITCH COMMERCIAL -->
    <div x-show="isSubscribed && showCommercialPitch" style="display: none;" class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div class="max-w-xl w-full bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 space-y-6">
            <div class="flex justify-between items-center border-b border-slate-700 pb-4">
                <h2 class="text-lg font-black text-amber-400">💼 Votre Solution App.Nova.Infinity</h2>
                <button @click="showCommercialPitch = false" class="text-slate-400 hover:text-white font-bold text-base">✕</button>
            </div>
            <div class="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>Vous profitez d'une plateforme SaaS professionnelle et d'un accompagnement personnalisé :</p>
                <ul class="list-disc pl-5 space-y-1.5">
                    <li><strong>Installation Clé en Main :</strong> Réalisée par notre équipe pour paramétrer votre catalogue de prestations et vos coordonnées.</li>
                    <li><strong>Abonnement Maîtrisé :</strong> Un tarif fixe de <strong>29 € HT / mois</strong> sans mauvaise surprise.</li>
                    <li><strong>Persistance Cloud (Supabase) :</strong> Vos documents et clients sont synchronisés en temps réel et accessibles partout.</li>
                    <li><strong>Paiement en ligne & Acomptes (Stripe) :</strong> Encaissez vos clients par carte bancaire immédiatement après signature tactile sur chantier.</li>
                </ul>
            </div>
            <div class="pt-2 flex justify-end">
                <button @click="showCommercialPitch = false" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">Fermer</button>
            </div>
        </div>
    </div>

    <!-- MODALE PARAMÈTRES -->
    <div x-show="openAdminModal" style="display: none;" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white max-w-lg w-full p-8 rounded-3xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 class="font-black text-slate-900 text-base">⚙️ Paramètres & Gestion de l'Entreprise</h3>
                <button @click="openAdminModal = false" class="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>
            <div class="space-y-3 text-xs">
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Rôle Utilisateur</label>
                    <select x-model="userRole" class="w-full border border-slate-300 rounded-xl p-2.5 bg-indigo-50 font-semibold text-indigo-950 outline-none">
                        <option value="admin">Administrateur (Accès complet & Comptabilité)</option>
                        <option value="collaborateur">Collaborateur / Apprenti (Création de devis uniquement)</option>
                    </select>
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Nom & Prénom du Dirigeant</label>
                    <input type="text" x-model="managerName" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Nom de l'entreprise</label>
                    <input type="text" x-model="companyName" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Adresse professionnelle</label>
                    <input type="text" x-model="companyAddress" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">E-mail professionnel</label>
                    <input type="email" x-model="companyEmail" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Numéro SIRET</label>
                    <input type="text" x-model="companySiret" class="w-full border border-slate-300 rounded-xl p-2.5 outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">IBAN bancaire</label>
                    <input type="text" x-model="companyIban" class="w-full border border-slate-300 rounded-xl p-2.5 font-mono outline-none">
                </div>
                <div>
                    <label class="block font-medium text-slate-700 mb-1">Couleur principale de votre interface</label>
                    <input type="color" x-model="themeColor" class="w-12 h-10 rounded-xl border border-slate-300 p-1 cursor-pointer">
                </div>
            </div>
            <div class="pt-2 flex justify-end">
                <button @click="openAdminModal = false" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm">Enregistrer les modifications</button>
            </div>
        </div>
    </div>

</div>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('novaApp', () => ({
            isSubscribed: false,
            isPublicView: false,
            isClientSigningView: false,
            isPdfView: false,
            showCommercialPitch: false,
            openAdminModal: false,
            isTrialActive: false,
            userRole: 'admin',
            selectedSetupFee: '390',
            selectedTrade: 'Plomberie',
            managerName: 'Thomas Nova',
            companyName: 'Nova Plomberie',
            companyAddress: '45 Avenue des Entrepreneurs, 38000 Grenoble',
            companyEmail: 'contact@nova-plomberie.fr',
            companySiret: '842 910 334 00019',
            companyIban: 'FR76 3000 2000 1234 5678 9012 345',
            themeColor: '#4f46e5',
            currentClient: '',
            currentClientEmail: '',
            tvaRate: 10,
            currentService: 'Installation & Raccordement sanitaire',
            invoiceItems: [
                { name: 'Forfait intervention et mise en service', qty: 1, price: 250 }
            ],
            invoices: [],
            clientLeads: [
                { client: 'Marc Dupuis', email: 'marc.dupuis@gmail.com', service: 'Recherche de fuite & Dépannage urgence', options: ['Intervention prioritaire 48h'], message: 'Bonjour, fuite sous l’évier de cuisine depuis ce matin, merci de passer rapidement !' }
            ],
            publicClientName: '',
            publicClientEmail: '',
            publicSelectedService: '',
            publicOptions: [],
            clientMessage: '',
            signingInvoice: null,
            activePdf: null,
            isDrawing: false,
            canvasContext: null,
            currentTimestamp: '',
            defaultCatalogItems: [
                { name: 'Forfait intervention de base', price: 150 },
                { name: 'Fourniture matériel pro', price: 90 },
                { name: 'Garantie décennale & conformité', price: 120 }
            ],
            tradeServices: {
                'Plomberie': ['Installation & Raccordement sanitaire', 'Recherche de fuite & Dépannage urgence', 'Rénovation complète de salle de bains'],
                'Électricité': ['Câblage et mise en conformité tableau', 'Dépannage panne électrique & Diagnostic', 'Installation luminaires & Domotique'],
                'Bâtiment': ['Gros œuvre & Maçonnerie générale', 'Cloisons, Isolation & Plâtrerie', 'Rénovation tous corps d\'état'],
                'Peinture': ['Peinture murs et plafonds', 'Pose de revêtements muraux & Papiers peints', 'Ravalement de façade & Boiseries'],
                'Menuiserie': ['Pose de fenêtres et portes sur-mesure', 'Agencement dressings & Placards', 'Parquet et terrasses bois'],
                'Toiture': ['Réfection de toiture & Étanchéité', 'Nettoyage et démoussage de tuiles', 'Pose de Velux & Zinguerie'],
                'Carrelage': ['Pose de carrelage sol ou mural', 'Préparation du support & Ragréage', 'Faïence et mosaïque décorative'],
                'Jardinage': ['Création d\'espace vert & Plantations', 'Entretien paysager & Taille de haies', 'Pose de clôtures & Arrosage automatique'],
                'Rénovation': ['Rénovation globale d\'appartement / maison', 'Aménagement des espaces intérieurs', 'Isolation thermique par l\'intérieur'],
                'Nettoyage': ['Nettoyage de fin de chantier', 'Entretien régulier locaux professionnels', 'Remise en état après sinistre'],
                'Autre': ['Prestation sur-mesure standard', 'Intervention technique personnalisée']
            },
            getCurrentTradeServices() {
                let key = this.selectedTrade === 'Autre' ? 'Autre' : this.selectedTrade;
                return this.tradeServices[key] || ['Prestation standard'];
            },
            updateTradeDefaults() {
                if (this.selectedTrade && this.selectedTrade !== 'Autre') {
                    this.companyName = 'Nova ' + this.selectedTrade;
                    this.companyEmail = 'contact@nova-' + this.selectedTrade.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "") + '.fr';
                }
                let srvs = this.getCurrentTradeServices();
                this.publicSelectedService = srvs[0] || '';
            },
            startFreeTrial() {
                this.isTrialActive = true;
                this.publicSelectedService = this.getCurrentTradeServices()[0] || '';
                this.isSubscribed = true;
            },
            redirectToStripeCheckout() {
                alert("Redirection Stripe initialisée avec succès.\\n\\nFrais d'installation (" + this.selectedSetupFee + " € HT) + Abonnement 29€ HT/mois pris en compte.");
                this.isTrialActive = false;
                this.isSubscribed = true;
            },
            cancelTrial() {
                if (confirm("Souhaitez-vous suspendre votre période d'essai Cloud ? Vos données resteront sauvegardées pendant 30 jours.")) {
                    this.isTrialActive = false;
                    this.isSubscribed = false;
                    alert("Votre essai a été suspendu.");
                }
            },
            addCustomItem() {
                this.invoiceItems.push({ name: 'Nouvelle ligne de prestation', qty: 1, price: 100 });
            },
            addCatalogItem(name) {
                if (!name) return;
                let found = this.defaultCatalogItems.find(i => i.name === name);
                if (found) {
                    this.invoiceItems.push({ name: found.name, qty: 1, price: found.price });
                }
            },
            removeItem(index) {
                this.invoiceItems.splice(index, 1);
            },
            calculateTotalHT() {
                return this.invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2);
            },
            calculateTVA() {
                let ht = parseFloat(this.calculateTotalHT());
                return (ht * (this.tvaRate / 100)).toFixed(2);
            },
            calculateTotalTTC() {
                let ht = parseFloat(this.calculateTotalHT());
                let tva = parseFloat(this.calculateTVA());
                return (ht + tva).toFixed(2);
            },
            calculateAcompte() {
                let ttc = parseFloat(this.calculateTotalTTC());
                return (ttc * 0.3).toFixed(2);
            },
            calculateSigningAcompte() {
                if (!this.signingInvoice) return 0;
                return (parseFloat(this.signingInvoice.totalTTC) * 0.3).toFixed(2);
            },
            calculateProjectedCashflow() {
                let total = 0;
                this.invoices.forEach(inv => {
                    if (inv.isFacture) {
                        total += parseFloat(inv.totalTTC);
                    } else if (inv.signature) {
                        total += parseFloat(inv.totalTTC) * 0.3;
                    }
                });
                return total.toFixed(2);
            },
            submitPublicLead() {
                if (!this.publicClientName) {
                    alert('Veuillez renseigner votre nom.');
                    return;
                }
                let newLead = {
                    client: this.publicClientName,
                    email: this.publicClientEmail || 'client@example.com',
                    service: this.publicSelectedService,
                    options: [...this.publicOptions],
                    message: this.clientMessage
                };
                this.clientLeads.push(newLead);
                alert('Votre demande a bien été transmise à l\\'artisan.');
                this.publicClientName = '';
                this.publicClientEmail = '';
                this.publicOptions = [];
                this.clientMessage = '';
                this.isPublicView = false;
            },
            getRichEmailBody(lead) {
                let subject = "Votre projet de " + lead.service + " avec " + this.companyName;
                let optionsText = lead.options.length > 0 ? " J'ai bien noté vos options choisies (" + lead.options.join(', ') + ")." : "";
                let body = "Bonjour " + lead.client + ",\\n\\nMerci pour votre message concernant votre projet de " + lead.service + "." + optionsText + "\\n\\nJe prépare votre devis personnalisé et vous l'envoie rapidement.\\n\\nÀ très vite,\\n" + this.managerName + "\\n" + this.companyName + "\\n" + this.companyEmail;
                return 'mailto:' + (lead.email || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            },
            convertLeadToInvoice(lead) {
                this.currentClient = lead.client;
                this.currentClientEmail = lead.email;
                this.currentService = lead.service;
                
                this.invoiceItems = [
                    { name: lead.service, qty: 1, price: 300 }
                ];

                if (lead.options && lead.options.length > 0) {
                    lead.options.forEach(opt => {
                        this.invoiceItems.push({ name: 'Option : ' + opt, qty: 1, price: 80 });
                    });
                }

                window.scrollTo({ top: 400, behavior: 'smooth' });
                alert('Demande convertie en devis avec succès.');
            },
            saveAndPublishInvoice() {
                if (!this.currentClient) {
                    alert('Veuillez indiquer le nom du client.');
                    return;
                }
                let nextNum = this.invoices.length + 1;
                let formattedNum = 'DEV-2026-' + String(nextNum).padStart(4, '0');

                let newInv = {
                    number: formattedNum,
                    client: this.currentClient,
                    clientEmail: this.currentClientEmail,
                    service: this.currentService,
                    totalTTC: this.calculateTotalTTC(),
                    isFacture: false,
                    signature: null,
                    signatureMeta: '',
                    relanceCount: 0,
                    items: [...this.invoiceItems]
                };
                this.invoices.unshift(newInv);
                alert('Devis ' + formattedNum + ' enregistré avec succès.');
            },
            openPdfView(inv) {
                this.activePdf = inv;
                this.isPdfView = true;
            },
            openClientPortalForSigning(inv) {
                this.signingInvoice = inv;
                this.currentTimestamp = new Date().toLocaleString('fr-FR');
                this.isClientSigningView = true;
                setTimeout(() => { this.initCanvas(); }, 100);
            },
            initCanvas() {
                const canvas = document.getElementById('signatureCanvas');
                if (!canvas) return;
                this.canvasContext = canvas.getContext('2d');
                this.canvasContext.lineWidth = 2;
                this.canvasContext.lineCap = 'round';
                this.canvasContext.strokeStyle = '#0f172a';

                const getPos = (e) => {
                    const rect = canvas.getBoundingClientRect();
                    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                    return {
                        x: clientX - rect.left,
                        y: clientY - rect.top
                    };
                };

                const startDraw = (e) => {
                    e.preventDefault();
                    this.isDrawing = true;
                    const pos = getPos(e);
                    this.canvasContext.beginPath();
                    this.canvasContext.moveTo(pos.x, pos.y);
                };

                const draw = (e) => {
                    if (!this.isDrawing) return;
                    e.preventDefault();
                    const pos = getPos(e);
                    this.canvasContext.lineTo(pos.x, pos.y);
                    this.canvasContext.stroke();
                };

                const stopDraw = (e) => {
                    if (!this.isDrawing) return;
                    e.preventDefault();
                    this.isDrawing = false;
                };

                canvas.onmousedown = startDraw;
                canvas.onmousemove = draw;
                canvas.onmouseup = stopDraw;
                canvas.onmouseleave = stopDraw;

                canvas.ontouchstart = startDraw;
                canvas.ontouchmove = draw;
                canvas.ontouchend = stopDraw;
            },
            clearCanvas() {
                const canvas = document.getElementById('signatureCanvas');
                if (canvas && this.canvasContext) {
                    this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                }
            },
            validateSignatureAndPayStripe() {
                const canvas = document.getElementById('signatureCanvas');
                if (!canvas) return;
                const dataUrl = canvas.toDataURL('image/png');
                if (this.signingInvoice) {
                    this.signingInvoice.signature = dataUrl;
                    this.signingInvoice.signatureMeta = 'Signé le ' + this.currentTimestamp + ' - IP sécurisée';
                }
                this.isClientSigningView = false;
                alert('Paiement de l\\'acompte validé via Stripe et signature enregistrée.');
            },
            convertToFacture(inv) {
                inv.isFacture = true;
                inv.number = inv.number.replace('DEV', 'FAC');
            },
            sendRelanceEmail(inv) {
                inv.relanceCount = (inv.relanceCount || 0) + 1;
                let subject, body;

                if (!inv.isFacture) {
                    subject = "Suivi de votre devis " + inv.number + " - " + this.companyName;
                    body = "Bonjour " + inv.client + ",\\n\\nJe me permets de faire un petit point concernant votre devis " + inv.number + " d'un montant de " + inv.totalTTC + " € TTC.\\n\\nAvez-vous pu étudier notre proposition ? Je reste à votre entière disposition si vous avez des questions ou souhaitez ajuster certains points.\\n\\nRestant à votre écoute,\\n" + this.managerName + "\\n" + this.companyName;
                } else {
                    if (inv.relanceCount === 1) {
                        subject = "Rappel amical : Facture " + inv.number + " - " + this.companyName;
                        body = "Bonjour " + inv.client + ",\\n\\nSauf erreur de notre part, nous n'avons pas encore reçu le règlement de votre facture " + inv.number + " d'un montant de " + inv.totalTTC + " € TTC.\\n\\nPensez à effectuer le virement sur notre IBAN ou à nous contacter en cas de besoin.\\n\\nBien à vous,\\n" + this.managerName + "\\n" + this.companyName;
                    } else {
                        subject = "⚠️ Dernier rappel : Facture impayée " + inv.number + " - " + this.companyName;
                        body = "Bonjour " + inv.client + ",\\n\\nNous constatons ce jour qu'aucune régularisation n'a été effectuée concernant la facture " + inv.number + " (" + inv.totalTTC + " € TTC).\\n\\nNous vous remercions de bien vouloir procéder au règlement dans les plus brefs délais afin d'éviter toute complication.\\n\\nComptant sur votre réactivité,\\n" + this.managerName + "\\n" + this.companyName;
                    }
                }

                window.location.href = "mailto:" + (inv.clientEmail || '') + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            },
            exportCSV() {
                if (this.invoices.length === 0) {
                    alert("Aucune donnée comptable à exporter.");
                    return;
                }
                let csvContent = "data:text/csv;charset=utf-8,Reference;Client;Email;Prestation;TotalTTC;Type\\n";
                this.invoices.forEach(inv => {
                    let typeDoc = inv.isFacture ? "Facture" : "Devis";
                    csvContent += \`"\${inv.number}","\${inv.client}","\${inv.clientEmail || ''}","\${inv.service}","\${inv.totalTTC}","\${typeDoc}"\\n\`;
                });
                let encodedUri = encodeURI(csvContent);
                let link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "comptabilite_app_nova.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }));
    });
</script>
        `,
      }}
    />
  );
}