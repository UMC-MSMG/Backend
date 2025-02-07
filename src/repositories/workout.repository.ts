import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWorkoutsByCategory = async () => {
  return await prisma.workoutCategory.findMany();
};

export const getWorkoutsByCategoryId = async (categoryId: bigint) => {
  return await prisma.workout.findMany({
    where: {
      categoryId: categoryId,
      deletedAt: null,
    },
    select: {
      id: true,
      workoutName: true,
      videoLink: true,
      description: true,
      videoName: true,
    },
  });
};