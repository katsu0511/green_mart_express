import { z } from 'zod';

export const orderIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
