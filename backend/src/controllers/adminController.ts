import type { Request, Response } from 'express';
import * as adminService from '@/services/adminService.js';

export const getDashboard = async (_req: Request, res: Response) => {
  const dashboardInfo = await adminService.getDashboard();
  res.status(200).json(dashboardInfo);
};

export const addStock = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { quantity } = req.body;
  const product = await adminService.addStock(productId, quantity);
  res.status(200).json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { categoryId, name, description, price, imageUrl, stock } = req.body;
  const product = await adminService.createProduct(categoryId, name, description, price, imageUrl, stock);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { categoryId, name, description, price, imageUrl } = req.body;
  const product = await adminService.updateProduct(productId, categoryId, name, description, price, imageUrl);
  res.status(200).json(product);
};
