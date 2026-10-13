import { NextResponse } from 'next/server';

// Modèle de secours ultra-courtois et professionnel si l'IA est indisponible
function getFallbackEmail(quote: { clientName: string; id: string; description: string; amount: number; createdAt: string }) {
  return `Bonjour ${quote.clientName},

J'espère que vous allez bien.

Je me permets de revenir vers vous concernant le devis n° ${quote.id} (${quote.description}) d'un montant de ${quote.amount.toFixed(2)} € HT, transmis le ${quote.createdAt}.

Avez-vous eu l'occasion d'en prendre connaissance ou auriez-vous des questions particulières concernant votre projet ?

Toute notre équipe se tient à votre entière disposition pour vous accompagner.

Bien cordialement,
L'équipe Nova Infinity`;
}

export async function GET(req: Request) {
  try {
    // 1. Sécurité du Cron Job
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    // 2. Source des devis en attente (Exemple de production / Supabase)
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
      let emailContent = '';

      // 3. Tentative de génération via l'IA (Groq) si la clé existe
      if (apiKey) {
        const prompt = `Tu es l'assistant virtuel de Nova Infinity BTP. Rédige un e-mail de relance très courtois, élégant et bienveillant destiné au client ${quote.clientName}. 
        Objet du rappel : Devis n° ${quote.id} (${quote.amount} € HT) émis le ${quote.createdAt} pour "${quote.description}".
        Consignes :
        1. Salue chaleureusement.
        2. Demande avec délicatesse s'il a pu étudier le devis et s'il a des questions.
        3. Indique que l'équipe reste disponible pour valider l'intervention.
        4. Ton professionnel et chaleureux, 4 phrases maximum. Pas d'objet.`;

        const modelsToTry = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];

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
                temperature: 0.5,
                max_tokens: 300,
              }),
            });

            if (aiResponse.ok) {
              const aiData = await aiResponse.json();
              emailContent = aiData?.choices?.[0]?.message?.content?.trim() || '';
              if (emailContent) break;
            }
          } catch (e) {
            console.warn(`[Relances] Échec du modèle ${model}, essai du suivant...`);
          }
        }
      }

      // 4. Si l'IA n'a pas répondu ou pas de clé, passage instantané sur le Fallback garanti
      if (!emailContent) {
        emailContent = getFallbackEmail(quote);
      }

      // 5. Enregistrement du résultat prêt à l'envoi
      results.push({
        quoteId: quote.id,
        client: quote.clientName,
        emailTarget: quote.clientEmail,
        status: 'Relance générée et validée avec succès',
        content: emailContent
      });
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