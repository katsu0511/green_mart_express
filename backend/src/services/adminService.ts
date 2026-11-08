import * as adminRepository from '@/repositories/adminRepository.js';
import { AppError } from '@/lib/appError.js';
import { findProductById } from '@/repositories/productRepository.js';

export const getDashboard = async () => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [salesResult, orderCount, orderMonths] = await Promise.all([
      adminRepository.getMonthlySales(startOfMonth, startOfNextMonth),
      adminRepository.getMonthlyOrderCount(startOfMonth, startOfNextMonth),
      adminRepository.getOrderMonths()
    ]);

    const sales = salesResult._sum.totalAmount ?? 0;
    const months = orderMonths.map(orderMonth => ({ year: Number(orderMonth.year), month: Number(orderMonth.month) }));

    return { sales, orders: orderCount, months };
  } catch (error) {
    throw new Error('Failed to fetch dashboard information');
  }
};

export const addStock = async (productId: number, quantity: number) => {
  try {
    return await adminRepository.updateStock(productId, quantity);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 404) {
      throw new AppError(404, 'Product not found');
    }
    throw new Error('Failed to add stock');
  }
};

export const createProduct = async (categoryId: number, name: string, description: string, price: number, imageUrl: string, stock: number) => {
  const category = await adminRepository.findCategoryById(categoryId);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  try {
    return await adminRepository.createProduct({ categoryId, name, description, price, imageUrl, stock });
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (productId: number, categoryId: number, name: string, description: string, price: number, imageUrl: string) => {
  const category = await adminRepository.findCategoryById(categoryId);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  const product = await findProductById(productId);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  try {
    return await adminRepository.updateProduct({ productId, categoryId, name, description, price, imageUrl });
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (productId: number) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  try {
    return await adminRepository.deleteProduct(productId);
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};
