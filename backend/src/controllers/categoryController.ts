import type { Request, Response } from 'express';
import type { Category } from '@/lib/generated/prisma/client.js';
import * as categoryService from '@/services/categoryService.js';

export const getCategories = async (_req: Request, res: Response) => {
  const categories: Category[] = await categoryService.getCategories();
  res.status(200).json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug } = req.body;
  const category: Category = await categoryService.createCategory(name, slug);
  res.status(201).json(category);
};
