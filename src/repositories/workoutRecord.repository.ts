import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WorkoutRecordRepository {
  async findUserWorkoutLevel(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { workoutLevel: true },
    });
  }

  async findExistingRecords(userId: number, startDate: Date, endDate: Date) {
    return prisma.workoutRecord.findMany({
      where: {
        userId,
        scheduledDate: {
          gte: startDate,
          lt: endDate,
        },
        deletedAt: null,
      },
    });
  }

  async createWorkoutRecords(
    records: { scheduledDate: Date; userId: number; workoutId: number }[]
  ) {
    return prisma.workoutRecord.createMany({
      data: records.map((record) => ({
        scheduledDate: record.scheduledDate,
        userId: record.userId,
        workoutId: record.workoutId,
        isComplete: false,
      })),
      skipDuplicates: true, // 중복 삽입 방지
    });
  }
}
