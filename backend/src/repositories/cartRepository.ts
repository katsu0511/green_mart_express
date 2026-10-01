import type { CartItemWithDetail } from '@/types/cartItem.js';
import prisma from '@/lib/prisma.js';
import type { CartItem } from '@/lib/generated/prisma/client.js';

export const findCartItems = (userId: number): Promise<CartItemWithDetail[]> => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
};

export const upsertCartItem = (data: { userId: number, productId: number, quantity: number }): Promise<CartItemWithDetail> => {
  return prisma.cartItem.upsert({
    where: {
      cart_item_pk: {
        userId: data.userId,
        productId: data.productId,
      },
    },
    create: data,
    update: {
      quantity: {
        increment: data.quantity,
      },
    },
    select: {
      userId: true,
      quantity: true,
      product: true,
    },
  });
};

export const deleteCartItem = (userId: number, productId: number): Promise<CartItem> => {
  return prisma.cartItem.delete({
    where: {
      cart_item_pk: {
        userId,
        productId,
      },
    },
  });
};
