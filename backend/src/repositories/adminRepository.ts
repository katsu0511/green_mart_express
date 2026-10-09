import prisma from '@/lib/prisma.js';
import type { OrderMonth } from '@/types/order.js';
import type { Product } from '@/lib/generated/prisma/client.js';
import { AppError } from '@/lib/appError.js';

export const getMonthlySales = (startDate: Date, endDate: Date) => {
  return prisma.order.aggregate({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
      status: {
        not: 'CANCELLED',
      },
    },
    _sum: {
      totalAmount: true,
    },
  });
};

export const getMonthlyOrderCount = (startDate: Date, endDate: Date): Promise<number> => {
  return prisma.order.count({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
      status: {
        not: 'CANCELLED',
      },
    },
  });
};

export const getOrderMonths = (): Promise<OrderMonth[]> => {
  return prisma.$queryRaw<OrderMonth[]>`
    SELECT YEAR(createdAt) AS year, MONTH(createdAt) AS month
    FROM orders
    GROUP BY year, month
    ORDER BY year, month
  `;
};

export const updateStock = (productId: number, quantity: number): Promise<Product> => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return tx.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  });
};
