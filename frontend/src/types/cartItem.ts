import type { Product } from './product';

export type CartItemWithDetail = {
  userId: number
  quantity: number
  product: Product
};
