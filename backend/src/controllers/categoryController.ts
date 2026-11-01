import type { Request, Response } from 'express';
import type { Category } from '@/lib/generated/prisma/client.js';
import * as categoryService from '@/services/categoryService.js';

export const getCategories = async (_req: Request, res: Response) => {
  const categories: Category[] = await categoryService.getCategories();
  res.status(200).json(categories);
};
