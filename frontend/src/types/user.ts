export type Role = 'CUSTOMER' | 'ADMIN';

export type AppUser = {
  id: number
  email: string
  name: string
  address: string
  role: Role
  createdAt: Date
};
