import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWorkoutsByCategory = async () => {
  return await prisma.workoutCategory.findMany();
};