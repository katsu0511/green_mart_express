import type { Category } from '@/lib/generated/prisma/client.js';

export type ProductInfo = {
  id: number
  name: string
  price: number
  stock: number
};

export type ProductWithCategory = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  createdAt: Date
  updatedAt: Date
  category: Category
};
