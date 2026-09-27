import type { AppUser } from '@/types/user.js';
import { findUserById, findUserByEmail, createUser } from '@/repositories/userRepository.js';
import { AppError } from '@/lib/appError.js';
import type { User as AuthUser } from '@/lib/generated/prisma/client.js';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt.js';

export const getMe = async (userId: number) => {
  const user: AppUser | null = await findUserById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

export const login = async (email: string, password: string) => {
  const authUser: AuthUser | null = await findUserByEmail(email);

  if (!authUser) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isMatched = await bcrypt.compare(password, authUser.passwordHash);

  if (!isMatched) {
    throw new AppError(401, 'Invalid email or password');
  }

  const appUser: AppUser = {
    id: authUser.id,
    email: authUser.email,
    name: authUser.name,
    address: authUser.address,
    role: authUser.role,
    createdAt: authUser.createdAt
  };
  const token: string = generateToken(authUser.id);
  return { user: appUser, token };
};

export const signup = async (name: string, email: string, password: string) => {
  const existingUser: AuthUser | null = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user: AppUser = await createUser({ name, email, passwordHash });
  const token: string = generateToken(user.id);
  return { user, token };
};
