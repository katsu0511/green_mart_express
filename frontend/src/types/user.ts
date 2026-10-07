import type { Role } from '@/types/role';

export type AppUser = {
  id: number
  email: string
  name: string
  address: string
  role: Role
  createdAt: Date
};
