import { z } from 'zod';

export const cartAddSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
});

export const cartUpdateSchema = z.object({
  quantity: z.coerce.number().int().positive(),
});

export const cartParamSchema = z.object({
  productId: z.coerce.number().int().positive(),
});
