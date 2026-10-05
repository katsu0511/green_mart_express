export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export type Order = {
  id: number
  userId: number
  status: OrderStatus
  totalAmount: number
  shippingAddress: string
  createdAt: string
  updatedAt: string
};

export type OrderItemInfo = {
  productId: number
  quantity: number
};
