import type { Request, Response } from 'express';
import * as adminService from '@/services/adminService.js';

export const getDashboard = async (_req: Request, res: Response) => {
  const dashboardInfo = await adminService.getDashboard();
  res.status(200).json(dashboardInfo);
};
