import type { Category } from '@/types/category';

export type Product = {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  createdAt: string
  updatedAt: string
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
