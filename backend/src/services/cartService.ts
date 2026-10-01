import type { CartItemWithDetail } from '@/types/cartItem.js';
import * as cartRepository from '@/repositories/cartRepository.js';
import { Prisma } from '@/lib/generated/prisma/client.js';
import { AppError } from '@/lib/appError.js';

export const getCartItems = async (userId: number): Promise<CartItemWithDetail[]> => {
  try {
    return await cartRepository.findCartItems(userId);
  } catch (error) {
    throw new Error('Failed to fetch cart items');
  }
};

export const addCartItem = async (userId: number, productId: number, quantity: number): Promise<CartItemWithDetail> => {
  try {
    return await cartRepository.upsertCartItem({ userId, productId, quantity });
  } catch (error) {
    throw new Error('Failed to add cart item');
  }
};

export const deleteCartItem = async (userId: number, productId: number): Promise<void> => {
  try {
    await cartRepository.deleteCartItem(userId, productId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') throw new AppError(404, 'Cart item not found');
    throw new Error('Failed to delete cart item');
  }
};
