import prisma from '@/lib/prisma.js';
import type { OrderMonth } from '@/types/order.js';
import type { Product, Category } from '@/lib/generated/prisma/client.js';
import { AppError } from '@/lib/appError.js';
import type { ProductWithCategory } from '@/types/product.js';

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
      include: {
        category: true,
      },
    });
  });
};

export const findCategoryById = (categoryId: number): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
};

export const createProduct = (data: { categoryId: number, name: string, description: string, price: number, imageUrl: string, stock: number }): Promise<ProductWithCategory> => {
  return prisma.product.create({
    data,
    include: {
      category: true,
    },
  });
};

export const updateProduct = (data: {productId: number, categoryId: number, name: string, description: string, price: number, imageUrl: string}): Promise<ProductWithCategory> => {
  return prisma.product.update({
    where: { id: data.productId },
    data: {
      categoryId: data.categoryId,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
    },
    include: {
      category: true,
    },
  });
};

export const deleteProduct = (productId: number): Promise<Product> => {
  return prisma.product.delete({
    where: { id: productId },
  });
};
