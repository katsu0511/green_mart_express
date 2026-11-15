import type { DateString } from '@/types/date.js';
import prisma from '@/lib/prisma.js';
import { dateStringToDate } from '@/lib/dateConvert.js';

type CreateUserData = {
  name: string;
  birthDate: DateString;
  email: string;
  passwordHash: string;
};

export const findUserById = (userId: number) => {
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

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = (data: CreateUserData) => {
  return prisma.user.create({
    data: {
      name: data.name,
      birthDate: dateStringToDate(data.birthDate),
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
