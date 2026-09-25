import prisma from '@/lib/prisma.js';
import type { AppUser, AuthUser } from '@/types/user.js';

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
