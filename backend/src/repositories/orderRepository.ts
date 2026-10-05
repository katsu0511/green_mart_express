import type { Order } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';

export const findOrders = (userId: number): Promise<Order[]> => {
  return prisma.order.findMany({
    where: { userId },
  });
};
