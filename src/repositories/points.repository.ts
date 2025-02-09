import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserPointRepository = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: BigInt(userId) },
    select: { points: true },
  });
};

export const addUserPointsRepository = async (
  userId: number,
  points: number
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: points } },
  });
  return user.points;
};

export const useUserPointsRepository = async (
  userId: number,
  points: number
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { decrement: points } },
  });
  return user.points;
};
