import { z } from 'zod';

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
