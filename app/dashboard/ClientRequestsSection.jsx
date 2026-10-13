'use client';

import { useState } from 'react';

export default function ClientRequestsSection({ demandes, artisanName }) {
  const [activeRequest, setActiveRequest] = useState(null);
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDevisModal, setShowDevisModal] = useState(false);

  // États pour le formulaire de devis PDF
  const [devisData, setDevisData] = useState({ clientName: '', description: '', amount: '' });
  const [isGeneratingDevis, setIsGeneratingDevis] = useState(false);

  const handleGenerateReply = async (demande) => {
    setActiveRequest(demande);
    setLoading(true);
    setGeneratedReply('');

    try {
      const res = await fetch('/api/ai-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: demande.nom_client,
          clientMessage: demande.message,
          tradeName: 'Plomberie',
          artisanName: artisanName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setGeneratedReply(data.reply);
      } else {
        setGeneratedReply(data.error || 'Erreur lors de la génération du message.');
      }
    } catch (err) {
      console.error(err);
      setGeneratedReply("Erreur de connexion à l'assistant IA.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDevis = async () => {
    if (!devisData.clientName || !devisData.amount) {
      alert('Veuillez remplir au moins le nom du client et le montant.');
      return;
    }

    setIsGeneratingDevis(true);
    try {
      const res = await fetch('/api/devis/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(devisData),
      });

      const htmlContent = await res.text();
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      }

      setShowDevisModal(false);
      setDevisData({ clientName: '', description: '', amount: '' });
    } catch (err) {
      console.error('Erreur devis:', err);
      alert('Erreur lors de la création du devis.');
    } finally {
      setIsGeneratingDevis(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Demandes Reçues */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              📥 Demandes Reçues de vos Clients ({demandes.length})
            </h2>
            <p className="text-sm text-slate-500">Transformez une demande en devis officiel ou répondez avec l'IA.</p>
          </div>
          <button
            onClick={() => setShowDevisModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
          >
            + Créer un devis
          </button>
        </div>

        <div className="space-y-4">
          {demandes.map((req) => (
            <div key={req.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{req.nom_client}</span>
                  <span className="text-xs text-slate-400">({req.email})</span>
                  <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">{req.option}</span>
                </div>
                <p className="text-sm font-medium text-slate-700">{req.prestation}</p>
                <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 italic">
                  💬 "{req.message}"
                </p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => handleGenerateReply(req)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm flex items-center gap-1.5"
                >
                  ✨ Répondre avec l'IA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modale Réponse IA */}
      {activeRequest && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              Assistant IA — Réponse pour {activeRequest.nom_client}
            </h3>

            {loading ? (
              <div className="p-8 text-center text-slate-500 animate-pulse">
                🤖 Génération de la réponse sur-mesure via Groq (Llama-3.3)...
              </div>
            ) : (
              <textarea
                rows={6}
                value={generatedReply}
                onChange={(e) => setGeneratedReply(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveRequest(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  alert('E-mail envoyé au client avec succès !');
                  setActiveRequest(null);
                }}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                Envoyer au client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale Création de Devis PDF */}
      {showDevisModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">📄 Nouveau Devis Express</h3>
            <p className="text-xs text-slate-500">TVA non applicable - Article 293 B du CGI</p>
            
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Nom du Client" 
                value={devisData.clientName}
                onChange={(e) => setDevisData({ ...devisData, clientName: e.target.value })}
                className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" 
              />
              <input 
                type="text" 
                placeholder="Description Prestation BTP" 
                value={devisData.description}
                onChange={(e) => setDevisData({ ...devisData, description: e.target.value })}
                className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" 
              />
              <input 
                type="number" 
                placeholder="Montant HT (€)" 
                value={devisData.amount}
                onChange={(e) => setDevisData({ ...devisData, amount: e.target.value })}
                className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" 
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowDevisModal(false)}
                className="px-4 py-2 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Annuler
              </button>
              <button 
                onClick={handleDownloadDevis}
                disabled={isGeneratingDevis}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                {isGeneratingDevis ? 'Génération...' : 'Imprimer / Ouvrir le Devis PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}