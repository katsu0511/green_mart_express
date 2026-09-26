import type { AppUser } from '@/types/user.js';
import prisma from '@/lib/prisma.js';
import type { User as AuthUser } from '@/lib/generated/prisma/client.js';

export const findUserById = (userId: number): Promise<AppUser | null> => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });
};

export const findUserByEmail = (email: string): Promise<AuthUser | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = (data: {name: string, email: string, passwordHash: string}): Promise<AppUser> => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });
};
