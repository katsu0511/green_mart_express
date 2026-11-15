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
      birthDate: true,
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

export const createUser = (data: {name: string, birthDate: string, email: string, passwordHash: string}): Promise<AppUser> => {
  return prisma.user.create({
    data: {
      name: data.name,
      birthDate: new Date(`${data.birthDate}T00:00:00.000Z`),
      email: data.email,
      passwordHash: data.passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      birthDate: true,
      role: true,
      createdAt: true,
    },
  });
};

export const findUserRoleById = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });
};
