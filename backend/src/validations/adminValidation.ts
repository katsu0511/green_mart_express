import { z } from 'zod';

export const adminUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const stockUpdateSchema = z.object({
  quantity: z.coerce.number().int().positive(),
});
