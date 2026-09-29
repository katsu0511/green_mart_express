import type { CartItemWithDetail } from '@/types/cartItem.js';
import { findCartItems } from '@/repositories/cartRepository.js';

export const getCartItems = async (userId: number): Promise<CartItemWithDetail[]> => {
  try {
    return await findCartItems(userId);
  } catch (error) {
    throw new Error('Failed to fetch cart items');
  }
};
