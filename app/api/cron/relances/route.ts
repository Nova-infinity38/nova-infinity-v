import { NextResponse } from 'next/server';
// Importe ton client Supabase configuré pour le serveur
// import { supabase } from '@/lib/supabaseServer';

export async function GET(req: Request) {
  try {
    // Optionnel : Sécuriser avec un secret Cron pour éviter les appels non autorisés
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé GROQ_API_KEY manquante' }, { status: 500 });
    }

    // SIMULATION / REQUÊTE SUPABASE : Récupérer les devis en attente depuis plus de 5 ou 7 jours sans réponse
    // const { data: pendingQuotes, error } = await supabase
    //   .from('quotes')
    //   .select('*')
    //   .eq('status', 'en_attente')
    //   .lt('created_at', new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString());

    // Pour l'exemple, prenons un devis cible fictif issu de notre base :
    const pendingQuotes = [
      {
        id: 'DEV-427811',
        clientName: 'Marc Dupuis',
        clientEmail: 'marc.dupuis@gmail.com',
        description: 'Intervention prioritaire : Recherche de fuite & Dépannage urgence',
        amount: 123.00,
        createdAt: '2026-10-05'
      }
    ];

    const results = [];

    for (const quote of pendingQuotes) {
      // Prompt IA hautement courtois et professionnel pour la relance
      const prompt = `Tu es l'assistant virtuel de l'entreprise Nova Infinity BTP. Rédige un e-mail de relance très courtois, élégant et bienveillant destiné au client ${quote.clientName}. 
      Objet du rappel : Le devis n° ${quote.id} d'un montant de ${quote.amount} € émis le ${quote.createdAt} concernant "${quote.description}".
      Consignes :
      1. Salue chaleureusement le client.
      2. Demande-lui s'il a pu prendre connaissance du devis et s'il a des questions.
      3. Rappelle-le que l'équipe reste à sa disposition pour valider l'intervention.
      4. Pas d'objet d'e-mail, ton chaleureux et professionnel, 4 phrases maximum.`;

      // Modèles Groq avec repli dynamique
      const modelsToTry = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
      let aiMessage = '';

      for (const model of modelsToTry) {
        try {
          const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.6,
              max_tokens: 300,
            }),
          });

          const aiData = await aiResponse.json();
          if (aiResponse.ok) {
            aiMessage = aiData?.choices?.[0]?.message?.content?.trim() || '';
            break;
          }
        } catch (e) {
          console.warn(`Erreur relance modèle ${model}`);
        }
      }

      if (aiMessage) {
        // ICI : Intégrer l'envoi d'e-mail effectif (via Resend, SendGrid ou Nodemailer)
        // ex: await sendEmail({ to: quote.clientEmail, subject: `Relance Devis ${quote.id}`, body: aiMessage });

        results.push({
          quoteId: quote.id,
          client: quote.clientName,
          status: 'Relance générée et prête/envoyée avec succès',
          content: aiMessage
        });
      }
    }

    return NextResponse.json({
      success: true,
      relancesTraitees: results.length,
      details: results
    });

  } catch (error: any) {
    console.error('Erreur critique cron relances:', error);
    return NextResponse.json({ error: 'Erreur interne lors des relances automatiques' }, { status: 500 });
  }
}