import * as adminRepository from '@/repositories/adminRepository.js';
import { AppError } from '@/lib/appError.js';

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
