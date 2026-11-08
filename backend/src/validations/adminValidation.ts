import { z } from 'zod';

export const adminProductIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const stockUpdateSchema = z.object({
  quantity: z.coerce.number().int().positive(),
});

export const createProductSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().positive(),
  imageUrl: z.union([z.url(), z.literal('')]),
  stock: z.coerce.number().int().nonnegative(),
});

export const updateProductSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().positive(),
  imageUrl: z.union([z.url(), z.literal('')]),
});
