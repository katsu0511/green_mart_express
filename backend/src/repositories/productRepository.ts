import type { Product } from '@/types/product.js';
import prisma from '@/lib/prisma.js';

export const findProducts = (): Promise<Product[]> => prisma.product.findMany();

export const findProductById = (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: { id },
  });
};
