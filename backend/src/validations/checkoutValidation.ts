import { z } from 'zod';

const orderItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
});

export const checkoutSchema = z.object({
  shippingAddress: z.string().min(1),
  orderItems: z.array(orderItemSchema).min(1),
});
