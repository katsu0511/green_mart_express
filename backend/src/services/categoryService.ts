import type { Category } from '@/lib/generated/prisma/client.js';
import { findCategories } from '@/repositories/categoryRepository.js';

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await findCategories();
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
