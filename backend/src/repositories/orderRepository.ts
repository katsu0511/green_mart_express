import prisma from '@/lib/prisma.js';

export const findOrders = (userId: number) => {
  return prisma.order.findMany({
    where: { userId },
  });
};

export const findOrder = (userId: number, orderId: number) => {
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
