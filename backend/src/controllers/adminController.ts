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
