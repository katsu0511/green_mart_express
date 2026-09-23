import type { Product } from '@/lib/generated/prisma/client.js';
import { findProducts, findProductById } from '@/repositories/productRepository.js';

export const getProducts = async (): Promise<Product[]> => {
  try {
    return await findProducts();
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  let product: Product | null;

  try {
    product = await findProductById(id);
  } catch (error) {
    throw new Error('Failed to fetch product');
  }

  if (!product) throw new Error('Product not found');
  return product;
};
