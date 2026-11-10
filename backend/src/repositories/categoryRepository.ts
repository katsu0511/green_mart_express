import type { Category } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';

export const findCategories = (): Promise<Category[]> => prisma.category.findMany();

export const createCategory = (name: string, slug: string): Promise<Category> => {
  return prisma.category.create({
    data: {
      name,
      slug,
    },
  });
};
