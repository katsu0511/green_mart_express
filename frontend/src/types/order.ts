import type { OrderStatus } from '@/types/orderStatus';
import type { OrderItem } from '@/types/orderItem';

export type Order = {
  id: number
  userId: number
  status: OrderStatus
  totalAmount: number
  shippingAddress: string
  createdAt: string
  updatedAt: string
};

export type OrderWithOrderItem = {
  id: number
  userId: number
  status: OrderStatus
  totalAmount: number
  shippingAddress: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
};
