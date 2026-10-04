import type { OrderItemInfo, OrderItemWithoutOrderId } from '@/types/orderItem.js';
import * as checkoutRepository from '@/repositories/checkoutRepository.js';
import { AppError } from '@/lib/appError.js';

export const checkout = async (userId: number, shippingAddress: string, items: OrderItemInfo[]) => {
  const orderItems: OrderItemWithoutOrderId[] = [];
  const productDataList = await checkoutRepository.findProductInfo(items);
  const productMap = new Map(productDataList.map(product => [product.id, product]));
  let totalAmount = 0;

  for (const item of items) {
    const productData = productMap.get(item.productId);
    if (!productData) throw new AppError(404, 'Product not found');
    if (productData.stock < item.quantity) throw new AppError(400, 'Insufficient stock');
    totalAmount += productData.price * item.quantity;
    orderItems.push({
      productId: productData.id,
      name: productData.name,
      price: productData.price,
      quantity: item.quantity,
    });
  }

  return checkoutRepository.checkout(userId, totalAmount, shippingAddress, orderItems);
};
