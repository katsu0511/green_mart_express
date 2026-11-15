import type { OrderStatus } from '@/lib/generated/prisma/client.js';
import type { DateTimeString } from '@/types/date.js';

export type Order = {
  id: number
  userId: number
  status: OrderStatus
  totalAmount: number
  shippingAddress: string
  createdAt: DateTimeString
  updatedAt: DateTimeString
};

export type OrderMonth = {
  year: number
  month: number
};
