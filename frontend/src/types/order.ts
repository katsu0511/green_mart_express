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

export type OrderItem = {
  orderId: number
  productId: number
  name: string
  price: number
  quantity: number
};

export type OrderItemInfo = {
  productId: number
  quantity: number
};
