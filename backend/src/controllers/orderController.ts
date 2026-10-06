import type { Request, Response } from 'express';
import type { Order } from '@/lib/generated/prisma/client.js';
import * as orderService from '@/services/orderService.js';

export const getOrders = async (req: Request, res: Response) => {
  const orders: Order[] = await orderService.getOrders(req.userId);
  res.status(200).json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const order: Order = await orderService.getOrder(req.userId, Number(req.params.id));
  res.status(200).json(order);
};
