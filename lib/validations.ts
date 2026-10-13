import { z } from 'zod';

// Schéma pour les Devis / Factures
export const devisSchema = z.object({
  clientName: z.string().min(2, "Le nom du client est requis"),
  clientEmail: z.string().email("Email client invalide"),
  amount: z.number().positive("Le montant doit être positif"),
  items: z.array(
    z.object({
      description: z.string().min(1, "La description est requise"),
      quantity: z.number().int().positive("La quantité doit être positive"),
      unitPrice: z.number().nonnegative("Le prix unitaire ne peut pas être négatif"),
    })
  ).min(1, "Le devis doit contenir au moins un article"),
});

// Schéma pour l'Assistant IA (/api/ai-reply)
export const aiPromptSchema = z.object({
  prompt: z.string().min(3, "Le prompt est trop court").max(2000, "Le prompt est trop long"),
});

// Schéma pour valider la structure d'un événement Stripe critique
export const stripeCheckoutSessionSchema = z.object({
  id: z.string().min(1),
  customer_details: z.object({
    email: z.string().email().nullable().optional(),
  }).nullable().optional(),
  customer: z.string().nullable().optional(),
  subscription: z.string().nullable().optional(),
});