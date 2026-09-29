import type { CartItemWithDetail } from '@/types/cartItem.js';
import prisma from '@/lib/prisma.js';

export const findCartItems = (userId: number): Promise<CartItemWithDetail[]> => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
};
