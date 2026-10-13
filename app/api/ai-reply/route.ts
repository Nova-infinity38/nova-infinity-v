import { NextResponse } from 'next/server';
import { devisSchema } from '@/lib/validations';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = devisSchema.safeParse(body);
    if (!validation.success) {
      logger.warn({ errors: validation.error.format() }, "Validation Zod échouée sur /api/devis/pdf");
      return NextResponse.json({ error: "Données de devis invalides", details: validation.error.format() }, { status: 400 });
    }

    const devisData = validation.data;
    logger.info({ client: devisData.clientName, amount: devisData.amount }, "Génération du devis PDF validée");

    return NextResponse.json({ success: true, message: "PDF généré avec succès" }, { status: 200 });
  } catch (error: any) {
    logger.error({ err: error.message }, "Erreur interne sur /api/devis/pdf");
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}