import type { Category } from '@/lib/generated/prisma/client.js';
import * as categoryService from '@/repositories/categoryRepository.js';

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await categoryService.findCategories();
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
