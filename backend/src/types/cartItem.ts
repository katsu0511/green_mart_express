import type { Product } from '@/lib/generated/prisma/client.js';

export type CartItemWithDetail = {
  userId: number
  quantity: number
  product: Product
};
