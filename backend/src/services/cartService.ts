import type { CartItemWithDetail } from '@/types/cartItem.js';
import * as cartRepository from '@/repositories/cartRepository.js';

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
