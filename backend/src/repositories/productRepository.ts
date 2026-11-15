import prisma from '@/lib/prisma.js';

export const findProducts = () => prisma.product.findMany();

export const findProductById = (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
};
