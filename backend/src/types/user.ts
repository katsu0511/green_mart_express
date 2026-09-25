export type AuthUser = {
  id: number
  email: string
  passwordHash: string
  name: string
  address: string
  role: string
  createdAt: Date
};

export type AppUser = {
  id: number
  email: string
  name: string
  address: string
  role: string
  createdAt: Date
};
