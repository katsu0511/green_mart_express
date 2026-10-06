import type { Order } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';

export const findOrders = (userId: number): Promise<Order[]> => {
  return prisma.order.findMany({
    where: { userId },
  });
};

export const findOrder = (userId: number, orderId: number): Promise<Order | null> => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: true,
    },
  });
};
