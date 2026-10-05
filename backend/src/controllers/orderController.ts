import type { Request, Response } from 'express';
import type { Order } from '@/lib/generated/prisma/client.js';
import * as orderService from '@/services/orderService.js';

export const getOrders = async (req: Request, res: Response) => {
  const orders: Order[] = await orderService.getOrders(req.userId);
  res.status(200).json(orders);
};
