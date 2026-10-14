'use client';

import { useState, useEffect } from 'react';

export default function NovaApp() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);
  const [isClientSigningView, setIsClientSigningView] = useState(false);
  const [isPdfView, setIsPdfView] = useState(false);
  const [showCommercialPitch, setShowCommercialPitch] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);
  
  const [selectedSetupFee, setSelectedSetupFee] = useState('390');
  const [selectedTrade, setSelectedTrade] = useState('Plomberie');
  const [managerName, setManagerName] = useState('Thomas Nova');
  const [companyName, setCompanyName] = useState('Nova Plomberie');
  const [companyAddress, setCompanyAddress] = useState('45 Avenue des Entrepreneurs, 38000 Grenoble');
  const [companyEmail, setCompanyEmail] = useState('contact@nova-plomberie.fr');
  const [companySiret, setCompanySiret] = useState('842 910 334 00019');
  const [companyIban, setCompanyIban] = useState('FR76 3000 2000 1234 5678 9012 345');
  const [themeColor, setThemeColor] = useState('#4f46e5');

  const [currentClient, setCurrentClient] = useState('');
  const [currentClientEmail, setCurrentClientEmail] = useState('');
  const [tvaRate, setTvaRate] = useState(10);
  const [currentService, setCurrentService] = useState('Installation & Raccordement sanitaire');
  
  const [invoiceItems, setInvoiceItems] = useState([
    { name: 'Forfait intervention et mise en service', qty: 1, price: 250 }
  ]);
  
  const [invoices, setInvoices] = useState([]);
  const [clientLeads, setClientLeads] = useState([
    { client: 'Marc Dupuis', email: 'marc.dupuis@gmail.com', service: 'Recherche de fuite & Dépannage urgence', options: ['Intervention prioritaire 48h'], message: 'Bonjour, fuite sous l’évier de cuisine depuis ce matin, merci de passer rapidement !' }
  ]);

  const defaultCatalogItems = [
    { name: 'Forfait intervention de base', price: 150 },
    { name: 'Fourniture matériel pro', price: 90 },
    { name: 'Garantie décennale & conformité', price: 120 }
  ];

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

  const updateTradeDefaults = (val) => {
    setSelectedTrade(val);
    if (val && val !== 'Autre') {
      setCompanyName('Nova ' + val);
      setCompanyEmail('contact@nova-' + val.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "") + '.fr');
    }
  };

  const calculateTotalHT = () => invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2);
  const calculateTVA = () => (parseFloat(calculateTotalHT()) * (tvaRate / 100)).toFixed(2);
  const calculateTotalTTC = () => (parseFloat(calculateTotalHT()) + parseFloat(calculateTVA())).toFixed(2);
  const calculateAcompte = () => (parseFloat(calculateTotalTTC()) * 0.3).toFixed(2);

  const saveAndPublishInvoice = () => {
    if (!currentClient) {
      alert('Veuillez indiquer le nom du client.');
      return;
    }
    const formattedNum = 'DEV-2026-' + String(invoices.length + 1).padStart(4, '0');
    const newInv = {
      number: formattedNum,
      client: currentClient,
      clientEmail: currentClientEmail,
      service: currentService,
      totalTTC: calculateTotalTTC(),
      isFacture: false,
      signature: null,
      relanceCount: 0,
      items: [...invoiceItems]
    };
    setInvoices([newInv, ...invoices]);
    alert('Devis ' + formattedNum + ' enregistré avec succès.');
  };

  return (
    <main className="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col">
      {!isSubscribed && (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-8 flex-grow flex flex-col justify-center">
          <div className="text-center space-y-3 flex flex-col items-center">
            <div className="inline-block mb-1">
              <img src="/logo-nova.jpg" alt="Logo Nova Infinity" className="h-28 md:h-40 w-auto object-contain mx-auto" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Concentrez-vous sur vos chantiers, nous prenons soin de votre gestion.</h1>
            <p className="text-sm text-slate-500 max-w-xl pt-1">Pensé avec des artisans de terrain. Configuré sur-mesure par notre équipe, sécurisé par le cloud et prêt à encaisser vos acomptes en un clin d'œil.</p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-slate-200 space-y-8 w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-950 to-indigo-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <span className="bg-amber-400 text-indigo-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wide">✨ 7 Jours d'Essai Offert • Zéro Contrainte</span>
              <h3 className="font-bold text-sm text-indigo-100">Choisissez votre formule d'installation clé en main :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-indigo-700/60 bg-indigo-900/40 cursor-pointer hover:bg-indigo-900/70 transition">
                  <input type="radio" name="setupTier" value="390" checked={selectedSetupFee === '390'} onChange={(e) => setSelectedSetupFee(e.target.value)} className="mt-1 text-amber-400" />
                  <div className="text-xs space-y-1">
                    <strong className="text-white block text-sm">Pack Artisan Essentiel — 390 € HT</strong>
                    <p className="text-indigo-200">Paramétrage initial de votre catalogue et charte graphique sous 48h.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-indigo-700/60 bg-indigo-900/40 cursor-pointer hover:bg-indigo-900/70 transition">
                  <input type="radio" name="setupTier" value="499" checked={selectedSetupFee === '499'} onChange={(e) => setSelectedSetupFee(e.target.value)} className="mt-1 text-amber-400" />
                  <div className="text-xs space-y-1">
                    <strong className="text-white block text-sm">Pack PME Intégral — 499 € HT</strong>
                    <p className="text-indigo-200">Migration de vos anciens fichiers clients et formation personnalisée.</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4 border-b border-slate-100 pb-6">
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">2. Vos Informations Professionnelles & Légales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Votre Nom & Prénom</label>
                  <input type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 outline-none" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nom de votre Entreprise</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">3. Votre Corps de Métier Principal</h2>
              <select value={selectedTrade} onChange={(e) => updateTradeDefaults(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3.5 text-sm bg-indigo-50/50 font-semibold text-indigo-950 outline-none">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <button onClick={() => setIsSubscribed(true)} className="bg-amber-400 hover:bg-amber-500 text-indigo-950 py-3.5 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer">
                  🎁 Démarrer mes 7 Jours Gratuits
                </button>
                <button onClick={() => setIsSubscribed(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer">
                  🚀 Activer l'Installation & l'Abonnement (Stripe)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSubscribed && (
        <div className="min-h-screen flex flex-col w-full">
          <header className="text-white shadow-md sticky top-0 z-50 transition-colors duration-300 w-full" style={{ backgroundColor: themeColor }}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src="/logo-nova.jpg" alt="Logo" className="h-10 w-auto object-contain bg-white rounded p-1" />
                <div>
                  <h1 className="text-sm font-bold">{companyName}</h1>
                  <p className="text-[10px] opacity-80">{managerName} • {selectedTrade}</p>
                </div>
              </div>
              <button onClick={() => setIsSubscribed(false)} className="bg-black/30 hover:bg-black/40 text-white px-3 py-1.5 rounded text-xs cursor-pointer">Quitter</button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6 flex-grow w-full">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-base">📝 Éditeur de Devis & Factures</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nom du Client</label>
                  <input type="text" value={currentClient} onChange={(e) => setCurrentClient(e.target.value)} placeholder="Ex: Jean Martin" className="w-full border border-slate-300 rounded-xl p-2.5 outline-none" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">E-mail du Client</label>
                  <input type="email" value={currentClientEmail} onChange={(e) => setCurrentClientEmail(e.target.value)} placeholder="jean@example.com" className="w-full border border-slate-300 rounded-xl p-2.5 outline-none" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Régime de TVA</label>
                  <select value={tvaRate} onChange={(e) => setTvaRate(Number(e.target.value))} className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-medium outline-none">
                    <option value="0">TVA non applicable (Art. 293 B du CGI)</option>
                    <option value="10">TVA réduite 10%</option>
                    <option value="20">TVA standard 20%</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>Montant Total TTC :</span>
                  <span className="text-base text-indigo-900">{calculateTotalTTC()} €</span>
                </div>
              </div>

              <button onClick={saveAndPublishInvoice} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
                💾 Enregistrer & Publier le Devis
              </button>
            </div>
          </main>
        </div>
      )}
    </main>
  );
}
