import type { Request, Response } from 'express';
import * as checkoutService from '@/services/checkoutService.js';

export const checkout = async (req: Request, res: Response) => {
  const { shippingAddress, orderItems } = req.body;
  const order = await checkoutService.checkout(req.userId, shippingAddress, orderItems);
  res.status(201).json(order);
};
