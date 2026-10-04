import type { CartItemWithDetail } from '@/types/cartItem.js';
import prisma from '@/lib/prisma.js';
import { AppError } from '@/lib/appError.js';
import type { CartItem } from '@/lib/generated/prisma/client.js';

export const findCartItems = (userId: number): Promise<CartItemWithDetail[]> => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
};

export const upsertCartItem = async (userId: number, productId: number, quantity: number): Promise<CartItemWithDetail> => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    const existingCartItem = await tx.cartItem.findUnique({
      where: {
        cart_item_pk: {
          userId: userId,
          productId: productId,
        },
      },
      select: {
        quantity: true,
      },
    });

    const newQuantity = (existingCartItem?.quantity ?? 0) + quantity;

    if (product.stock < newQuantity) {
      throw new AppError(400, 'Insufficient stock');
    }

    return tx.cartItem.upsert({
      where: {
        cart_item_pk: {
          userId: userId,
          productId: productId,
        },
      },
      create: { userId, productId, quantity },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      select: {
        userId: true,
        quantity: true,
        product: true,
      },
    });
  });
};

export const updateCartItem = (userId: number, productId: number, quantity: number): Promise<CartItem> => {
  return prisma.cartItem.update({
    where: {
      cart_item_pk: {
        userId,
        productId,
      },
    },
    data: {
      quantity
    }
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
