import { NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Unwrapping des params requis par Next.js 15/16
    const { id } = await params;
    
    if (!id) {
      return new NextResponse('Identifiant de facture manquant', { status: 400 });
    }

    const invoice = await db.invoice.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!invoice) {
      return new NextResponse('Facture introuvable en base de données', { status: 404 });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Facture ${invoice.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #059669; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; color: #065f46; }
          .total { margin-top: 30px; text-align: right; font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">FACTURE OFFICIELLE</div>
            <p><strong>Référence :</strong> ${invoice.id}<br><strong>Date :</strong> ${new Date(invoice.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <div>
            <h3>Nova Infinity BTP</h3>
            <p>Grenoble, France</p>
          </div>
        </div>
        <h2 style="margin-top: 40px;">Prestation : ${invoice.productName || 'Service BTP'}</h2>
        <div class="total">
          <p>Montant payé : ${((invoice.amount || 0) / 100).toFixed(2)} € HT</p>
          <p style="font-size: 14px; color: #4b5563; font-weight: normal;">TVA non applicable, art. 293 B du CGI</p>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="facture-${invoice.id}.html"`,
      },
    });
  } catch (error) {
    console.error('Erreur génération PDF facture:', error);
    return new NextResponse('Erreur interne serveur PDF', { status: 500 });
  }
}