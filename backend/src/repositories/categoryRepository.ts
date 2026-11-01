import type { Category } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';

export const findCategories = (): Promise<Category[]> => prisma.category.findMany();
