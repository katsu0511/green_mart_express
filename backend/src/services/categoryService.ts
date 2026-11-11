import type { Category } from '@/lib/generated/prisma/client.js';
import * as categoryRepository from '@/repositories/categoryRepository.js';

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await categoryRepository.findCategories();
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (name: string, slug: string): Promise<Category> => {
  try {
    return await categoryRepository.createCategory(name, slug);
  } catch (error) {
    throw new Error('Failed to create category');
  }
};
