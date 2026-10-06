import type { OrderItemInfo, OrderItemWithoutOrderId } from '@/types/orderItem.js';
import type { ProductInfo } from '@/types/product.js';
import prisma from '@/lib/prisma.js';
import type { Order } from '@/lib/generated/prisma/client.js';
import { AppError } from '@/lib/appError.js';

export const findProductInfo = (items: OrderItemInfo[]): Promise<ProductInfo[]> => {
  const productIds = items.map(item => item.productId);
  return prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
    },
  });
};

export const checkout = (userId: number, totalAmount: number, shippingAddress: string, orderItems: OrderItemWithoutOrderId[]): Promise<Order> => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
      },
    });

    await tx.orderItem.createMany({
      data: orderItems.map(orderItem => ({
        orderId: order.id,
        ...orderItem,
      })),
    });

    for (const orderItem of orderItems) {
      const result = await tx.product.updateMany({
        where: {
          id: orderItem.productId,
          stock: {
            gte: orderItem.quantity,
          },
        },
        data: {
          stock: {
            decrement: orderItem.quantity,
          },
        },
      });

      if (result.count !== 1) {
        throw new AppError(400, 'Insufficient stock');
      }
    }

    await tx.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    return order;
  });
};
