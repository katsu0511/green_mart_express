export type OrderItemInfo = {
  productId: number
  quantity: number
};

export type ProductInfo = {
  id: number
  name: string
  price: number
  stock: number
};

export type OrderItemWithoutOrderId = {
  productId: number
  name: string
  price: number
  quantity: number
};
