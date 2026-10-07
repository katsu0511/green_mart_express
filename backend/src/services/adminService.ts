import * as adminRepository from '@/repositories/adminRepository.js';

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

    return { sales, orders: orderCount, months: orderMonths };
  } catch (error) {
    throw new Error('Failed to fetch dashboard information');
  }
};
