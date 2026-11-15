import * as orderRepository from '@/repositories/orderRepository.js';
import { AppError } from '@/lib/appError.js';
import type { Order } from '@/types/order.js';
import { dateToDateTimeString } from '@/lib/dateConvert.js';

export const getOrders = async (userId: number) => {
  try {
    const prismaOrders = await orderRepository.findOrders(userId);
    return prismaOrders.map((order) => ({
      ...order,
      createdAt: dateToDateTimeString(order.createdAt),
      updatedAt: dateToDateTimeString(order.updatedAt),
    }));
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const getOrder = async (userId: number, orderId: number) => {
  try {
    const prismaOrder = await orderRepository.findOrder(userId, orderId);

    if (!prismaOrder) {
      throw new AppError(404, 'Order not found');
    }

    const order: Order = {
      ...prismaOrder,
      createdAt: dateToDateTimeString(prismaOrder.createdAt),
      updatedAt: dateToDateTimeString(prismaOrder.updatedAt),
    };

    return order;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new Error('Failed to fetch order');
  }
};
