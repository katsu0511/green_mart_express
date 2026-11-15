import type { Product } from '@/types/product.js';
import { findProducts, findProductById } from '@/repositories/productRepository.js';
import { dateToDateTimeString } from '@/lib/dateConvert.js';
import type { ProductWithCategory } from '@/types/product.js';
import { AppError } from '@/lib/appError.js';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const prismaProducts = await findProducts();
    return prismaProducts.map((product) => ({
      ...product,
      createdAt: dateToDateTimeString(product.createdAt),
      updatedAt: dateToDateTimeString(product.updatedAt),
    }));
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async (id: number): Promise<ProductWithCategory> => {
  try {
    const prismaProduct = await findProductById(id);

    if (!prismaProduct) {
      throw new AppError(404, 'Product not found');
    }

    const product: ProductWithCategory = {
      ...prismaProduct,
      createdAt: dateToDateTimeString(prismaProduct.createdAt),
      updatedAt: dateToDateTimeString(prismaProduct.updatedAt),
    };

    return product;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new Error('Failed to fetch product');
  }
};
