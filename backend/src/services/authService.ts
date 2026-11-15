import type { AppUser } from '@/types/user.js';
import { findUserById, findUserByEmail, createUser } from '@/repositories/userRepository.js';
import { AppError } from '@/lib/appError.js';
import { dateToDateString, dateToDateTimeString } from '@/lib/dateConvert.js';
import type { User as AuthUser } from '@/lib/generated/prisma/client.js';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt.js';
import type { SignupInput } from '@/types/signupData.js';

export const getMe = async (userId: number): Promise<AppUser> => {
  const authUser = await findUserById(userId);

  if (!authUser) {
    throw new AppError(404, 'User not found');
  }

  const appUser: AppUser = {
    ...authUser,
    birthDate: dateToDateString(authUser.birthDate),
    createdAt: dateToDateTimeString(authUser.createdAt),
  };

  return appUser;
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
    birthDate: dateToDateString(authUser.birthDate),
    role: authUser.role,
    createdAt: dateToDateTimeString(authUser.createdAt),
  };
  const token: string = generateToken(authUser.id);
  return { user: appUser, token };
};

export const signup = async (input: SignupInput) => {
  const { name, birthDate, email, password } = input;
  const existingUser: AuthUser | null = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const authUser = await createUser({ name, birthDate, email, passwordHash });

  const appUser: AppUser = {
    id: authUser.id,
    email: authUser.email,
    name: authUser.name,
    address: authUser.address,
    birthDate: dateToDateString(authUser.birthDate),
    role: authUser.role,
    createdAt: dateToDateTimeString(authUser.createdAt),
  };
  const token: string = generateToken(authUser.id);
  return { user: appUser, token };
};
