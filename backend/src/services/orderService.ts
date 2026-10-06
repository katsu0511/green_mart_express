import * as orderRepository from '@/repositories/orderRepository.js';
import type { Order } from '@/lib/generated/prisma/client.js';
import { AppError } from '@/lib/appError.js';

export const getOrders = async (userId: number) => {
  try {
    return await orderRepository.findOrders(userId);
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const getOrder = async (userId: number, orderId: number) => {
  try {
    const order: Order | null  = await orderRepository.findOrder(userId, orderId);

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new Error('Failed to fetch order');
  }
};
