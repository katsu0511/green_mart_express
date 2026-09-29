import type { Request, Response } from 'express';
import type { CartItemWithDetail } from '@/types/cartItem.js';
import * as cartService from '@/services/cartService.js';

export const getCartItems = async (req: Request, res: Response) => {
  const cartItems: CartItemWithDetail[] = await cartService.getCartItems(req.userId);
  res.status(200).json(cartItems);
};
