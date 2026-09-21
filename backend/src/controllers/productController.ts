import type { Request, Response } from 'express';
import type { Product } from '@/lib/generated/prisma/client.js';
import * as productService from '@/services/productService.js';

export const getProducts = async (_req: Request, res: Response) => {
  const products: Product[] = await productService.getProducts();
  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const product: Product = await productService.getProduct(id);
  res.status(200).json(product);
};
