import * as orderRepository from '@/repositories/orderRepository.js';

export const getOrders = async (userId: number) => {
  try {
    return await orderRepository.findOrders(userId);
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};
