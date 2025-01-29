import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserPoints = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { points: true },
  });
  return user?.points || 0;
};

export const addUserPoints = async (userId: number, points: number) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: points } },
  });
  return user.points;
};

export const useUserPoints = async (userId: number, points: number) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { decrement: points } },
  });
  return user.points;
};