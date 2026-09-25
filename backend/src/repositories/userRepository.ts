import prisma from '@/lib/prisma.js';

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = (data: {name: string, email: string, passwordHash: string}) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
