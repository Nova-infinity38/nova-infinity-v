'use client';

import { useState } from 'react';

export default function NovaInfinityApp() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'devis', 'clients', 'settings'
  const [selectedSetupFee, setSelectedSetupFee] = useState('390');
  const [selectedTrade, setSelectedTrade] = useState('Plomberie');
  const [managerName, setManagerName] = useState('Thomas Nova');
  const [companyName, setCompanyName] = useState('Nova Plomberie & Chauffage');
  const [companyEmail, setCompanyEmail] = useState('contact@nova-plomberie.fr');
  const [themeColor, setThemeColor] = useState('#4f46e5');

  // États du module Devis / Facturation
  const [currentClient, setCurrentClient] = useState('');
  const [currentClientEmail, setCurrentClientEmail] = useState('');
  const [tvaRate, setTvaRate] = useState(10);
  const [currentService, setCurrentService] = useState('Installation & Raccordement sanitaire');
  const [invoiceItems, setInvoiceItems] = useState([
    { name: 'Forfait intervention et mise en service', qty: 1, price: 250 }
  ]);
  const [invoices, setInvoices] = useState([
    { number: 'DEV-2026-0001', client: 'Jean Martin', service: 'Installation & Raccordement', totalTTC: '275.00', status: 'Validé & Acompte reçu' }
  ]);
  const [clientLeads, setClientLeads] = useState([
    { client: 'Marc Dupuis', email: 'marc.dupuis@gmail.com', service: 'Recherche de fuite urgente', message: 'Fuite sous l’évier de cuisine, intervention rapide souhaitée.' }
  ]);

  const tradeServices = {
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
  };

  const updateTradeDefaults = (e) => {
    const val = e.target.value;
    setSelectedTrade(val);
    if (val && val !== 'Autre') {
      setCompanyName('Nova ' + val);
      setCompanyEmail('contact@nova-' + val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + '.fr');
    }
  };

  const startFreeTrial = () => {
    setIsSubscribed(true);
  };

  const redirectToStripeCheckout = () => {
    alert("Redirection sécurisée vers Stripe Checkout.\n\nFrais d'installation (" + selectedSetupFee + " € HT) + Abonnement 29€ HT/mois pris en compte.");
    setIsSubscribed(true);
  };

  const calculateTotalHT = () => invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2);
  const calculateTVA = () => (parseFloat(calculateTotalHT()) * (tvaRate / 100)).toFixed(2);
  const calculateTotalTTC = () => (parseFloat(calculateTotalHT()) + parseFloat(calculateTVA())).toFixed(2);

  const saveAndPublishInvoice = () => {
    if (!currentClient) {
      alert('Veuillez indiquer le nom du client.');
      return;
    }
    const formattedNum = 'DEV-2026-' + String(invoices.length + 1).padStart(4, '0');
    const newInv = {
      number: formattedNum,
      client: currentClient,
      service: currentService,
      totalTTC: calculateTotalTTC(),
      status: 'Envoyé au client (En attente de signature)'
    };
    setInvoices([newInv, ...invoices]);
    alert('Devis ' + formattedNum + ' généré et publié avec succès !');
    setCurrentClient('');
    setCurrentClientEmail('');
  };

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* 1. LANDING PAGE COMMERCIALE HAUT DE GAMME */}
      {!isSubscribed && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16 flex-grow flex flex-col justify-center">
          
          {/* Header Hero */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700 text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
              <span>✨ Nova Infinity • L'ERP Cloud des Artisans & PME</span>
            </div>
            <div className="w-48 md:w-64 mx-auto p-3 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-2xl">
              <img src="/logo-nova.jpg" alt="Logo Nova Infinity" className="w-full h-auto object-contain rounded-xl" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Concentrez-vous sur vos chantiers, <span className="text-indigo-400">nous automatisons votre gestion.</span>
            </h1>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Devis instantanés sur le terrain, signatures électroniques sécurisées, acomptes Stripe encaissés en 1 clic et relances clients automatisées. Conçu pour le terrain.
            </p>
          </div>

          {/* Section Configuration & Tarifs Clé en Main */}
          <div className="bg-slate-800/90 backdrop-blur p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700 space-y-8 max-w-4xl mx-auto w-full">
            
            {/* Formules Setup */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-4 border border-indigo-800/50">
              <span className="bg-amber-400 text-indigo-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wide">
                🚀 Offre de Lancement • 7 Jours d'Essai Offerts
              </span>
              <h3 className="font-bold text-base text-indigo-100">Choisissez votre formule d'installation clé en main :</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${selectedSetupFee === '390' ? 'border-amber-400 bg-indigo-900/60 shadow-lg' : 'border-slate-700 bg-slate-900/40 hover:bg-slate-900/70'}`}>
                  <input type="radio" name="setupTier" value="390" checked={selectedSetupFee === '390'} onChange={(e) => setSelectedSetupFee(e.target.value)} className="mt-1 text-amber-400" />
                  <div className="text-xs space-y-1">
                    <strong className="text-white block text-sm">Pack Artisan Essentiel — 390 € HT</strong>
                    <p className="text-slate-300">Paramétrage initial de votre catalogue et charte graphique sous 48h.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${selectedSetupFee === '499' ? 'border-amber-400 bg-indigo-900/60 shadow-lg' : 'border-slate-700 bg-slate-900/40 hover:bg-slate-900/70'}`}>
                  <input type="radio" name="setupTier" value="499" checked={selectedSetupFee === '499'} onChange={(e) => setSelectedSetupFee(e.target.value)} className="mt-1 text-amber-400" />
                  <div className="text-xs space-y-1">
                    <strong className="text-white block text-sm">Pack PME Intégral — 499 € HT</strong>
                    <p className="text-slate-300">Migration de vos anciens fichiers clients et formation personnalisée.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Informations Entreprise & Métier */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700 text-xs">
              <div className="space-y-2">
                <label className="block font-medium text-slate-300">Votre Nom & Prénom</label>
                <input type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500 transition" />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-slate-300">Nom de votre Entreprise</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500 transition" />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-medium text-slate-300">Votre Corps de Métier Principal</label>
              <select value={selectedTrade} onChange={updateTradeDefaults} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-sm font-semibold text-white outline-none focus:border-indigo-500 transition">
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
            </div>

            {/* Boutons d'Action Principaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button onClick={startFreeTrial} className="bg-amber-400 hover:bg-amber-500 text-slate-950 py-4 rounded-xl font-extrabold text-sm transition shadow-lg cursor-pointer transform hover:-translate-y-0.5">
                🎁 Démarrer mes 7 Jours Gratuits
              </button>
              <button onClick={redirectToStripeCheckout} className="bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-sm transition shadow-lg cursor-pointer transform hover:-translate-y-0.5">
                🚀 Activer l'Installation & l'Abonnement (Stripe)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. ESPACE ARTISAN (TABLEAU DE BORD SAAS) */}
      {isSubscribed && (
        <div className="min-h-screen flex flex-col w-full bg-slate-950">
          
          {/* Header Dashboard */}
          <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/logo-nova.jpg" alt="Logo" className="h-10 w-auto object-contain bg-white rounded p-1 shadow" />
              <div>
                <h1 className="text-sm font-bold text-white">{companyName}</h1>
                <p className="text-[11px] text-slate-400">{managerName} • {selectedTrade}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <nav className="hidden md:flex gap-2">
                <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Tableau de bord</button>
                <button onClick={() => setActiveTab('devis')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'devis' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Devis & Factures</button>
                <button onClick={() => setActiveTab('clients')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'clients' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Leads & Chantiers</button>
              </nav>
              <button onClick={() => setIsSubscribed(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border border-slate-700">
                Déconnexion
              </button>
            </div>
          </header>

          {/* Contenu Principal du Dashboard */}
          <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 flex-grow w-full">
            
            {/* KPI Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-medium">Chiffre d'affaires en cours</span>
                <h3 className="text-2xl font-extrabold text-white">3 450,00 €</h3>
                <span className="text-[10px] text-emerald-400 font-semibold">＋ 12% ce mois-ci</span>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-medium">Devis en attente de signature</span>
                <h3 className="text-2xl font-extrabold text-indigo-400">{invoices.length} Devis</h3>
                <span className="text-[10px] text-indigo-300">Paiement acompte Stripe actif</span>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-medium">Demandes clients entrantes</span>
                <h3 className="text-2xl font-extrabold text-amber-400">{clientLeads.length} Lead(s)</h3>
                <span className="text-[10px] text-amber-300">Réponse automatisée active</span>
              </div>
            </div>

            {/* Éditeur de Devis Rapide */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span>📝</span> Éditeur de Devis & Facturation instantanée
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">Mode Professionnel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-300">Nom du Client</label>
                  <input type="text" value={currentClient} onChange={(e) => setCurrentClient(e.target.value)} placeholder="Ex: Jean Martin" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-300">E-mail du Client</label>
                  <input type="email" value={currentClientEmail} onChange={(e) => setCurrentClientEmail(e.target.value)} placeholder="jean@example.com" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-300">Régime de TVA</label>
                  <select value={tvaRate} onChange={(e) => setTvaRate(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500">
                    <option value="0">TVA non applicable (Art. 293 B du CGI)</option>
                    <option value="10">TVA réduite 10% (Travaux logement)</option>
                    <option value="20">TVA standard 20%</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 block">Total TTC calculé :</span>
                  <span className="text-xl font-extrabold text-indigo-400">{calculateTotalTTC()} €</span>
                </div>
                <button onClick={saveAndPublishInvoice} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer">
                  💾 Enregistrer & Publier le Devis
                </button>
              </div>
            </div>

            {/* Liste des Devis Récents */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
              <h3 className="font-bold text-white text-base">📁 Historique des Devis & Chantiers</h3>
              <div className="space-y-3">
                {invoices.map((inv, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-1">
                      <strong className="text-white text-sm">{inv.number} • {inv.client}</strong>
                      <p className="text-xs text-slate-400">{inv.service}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-indigo-400 font-bold text-sm">{inv.totalTTC} €</span>
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold px-2.5 py-1 rounded-full">{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>
      )}

    </div>
  );
}