import type { Product } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';
import type { ProductWithCategory } from '@/types/product.js';

export const findProducts = (): Promise<Product[]> => prisma.product.findMany();

export const findProductById = (id: number): Promise<ProductWithCategory | null> => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
};
