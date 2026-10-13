import { db } from '../db';
import Link from 'next/link';
import ClientRequestsSection from './ClientRequestsSection';

export default async function DashboardPage() {
  const client = await db.client.findUnique({
    where: { email: 'artisan.test@nova-infinity.com' },
    include: { invoices: true },
  });

  // Demandes de test du portail public (à synchroniser avec Supabase / Prisma en prod)
  const demandesClients = [
    {
      id: 'req_1',
      nom_client: 'Marc Dupuis',
      email: 'marc.dupuis@gmail.com',
      prestation: 'Recherche de fuite & Dépannage urgence',
      option: 'Intervention prioritaire 48h',
      message: 'Bonjour, fuite sous l’évier de cuisine depuis ce matin, merci de passer rapidement !',
      date: 'Aujourd\'hui',
    },
  ];

  // Calcul du montant total réglé
  const totalPaid = client?.invoices
    ?.filter((inv) => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.amount, 0) || 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* En-tête du Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Espace Pro
              </span>
              <span className="text-xs text-slate-400">
                ID Client : {client?.id || 'dea1c1fb-2f0f-4fd4-b386-96b9c944c1a1'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Tableau de Bord — Nova Infinity
            </h1>
            <p className="text-slate-600">
              Pilotez vos chantiers, vos clients et vos règlements en toute sérénité.
            </p>
          </div>
          <Link 
            href="/" 
            className="px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        {/* Indicateurs clés (KPIs BTP) */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Compte & Entreprise
            </span>
            <h2 className="text-lg font-semibold text-slate-800">
              {client ? client.name : 'Artisan Test Nova'}
            </h2>
            <p className="text-xs text-slate-500">Statut : Micro-entreprise (En cours)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chiffre d'Affaires Géré
            </span>
            <div className="text-2xl font-bold text-slate-900">
              {(totalPaid / 100).toFixed(2)} €
            </div>
            <p className="text-xs text-emerald-600 font-medium">Synchronisé via Stripe</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Formule Active
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-base font-semibold text-emerald-600">SaaS + Installation</span>
            </div>
            <p className="text-xs text-slate-500">Support prioritaire 48h</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Action Rapide
              </span>
              <h3 className="text-lg font-bold">Nouveau Devis</h3>
            </div>
            <p className="text-xs text-blue-100">
              Utilisez le bouton d'édition rapide ci-dessous pour générer un devis PDF conforme.
            </p>
          </div>
        </div>

        {/* --- SECTION CLIENTS : Demandes Reçues + Assistant IA + Modale Devis --- */}
        <ClientRequestsSection 
          demandes={demandesClients} 
          artisanName={client?.name || 'Thomas Nova'} 
        />

        {/* Historique des Factures & Règlements */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Facturation & Abonnements</h2>
              <p className="text-sm text-slate-500">Historique officiel de vos règlements automatisés.</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-medium">
              Conforme législation française
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Prestation / Produit</th>
                  <th className="p-4 font-semibold">Montant</th>
                  <th className="p-4 font-semibold">Statut</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Justificatif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {client && client.invoices.length > 0 ? (
                  client.invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 font-medium text-slate-800">{inv.productName}</td>
                      <td className="p-4 text-slate-600">{(inv.amount / 100).toFixed(2)} € HT</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          inv.status === 'paid' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {inv.status === 'paid' ? 'Payé' : 'En attente'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(inv.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-4 text-right">
                        {inv.status === 'paid' ? (
                          <a 
                            href={`/api/invoice/${inv.id}/pdf`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 font-semibold hover:underline"
                          >
                            Télécharger PDF
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Non disponible</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      Aucune facture enregistrée pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}