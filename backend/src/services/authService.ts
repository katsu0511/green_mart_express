import type { AppUser, AuthUser } from '@/types/user.js';
import { findUserByEmail, createUser } from '@/repositories/userRepository.js';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt.js';

export const signup = async (name: string, email: string, password: string) => {
  const existingUser: AuthUser | null = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user: AppUser = await createUser({ name, email, passwordHash });
  const token: string = generateToken(user.id);
  return { user, token };
};
