import { findUserByEmail, createUser } from '@/repositories/userRepository.js';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt.js';

export const signup = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, passwordHash });
  const token = generateToken(user.id);
  return { user, token };
};
