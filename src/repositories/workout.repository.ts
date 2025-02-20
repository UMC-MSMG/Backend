import { prisma } from "../db.config";

export const WorkoutRepository = {
  addWorkoutRecord: async (userId: number, workoutId: number) => {
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0 // 시간 00:00:00.000 설정
    );

    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0 // 시간 00:00:00.000 설정
    );

    console.log("오늘 (KST 기준 00:00:00):", today);
    console.log("내일 (KST 기준 00:00:00):", tomorrow);

    console.log(today);
    const time = await prisma.workoutRecord.findFirst({
      where: {
        userId: userId,
        isComplete: false,
        workoutId: workoutId,
      },
    });
    console.log("타임", time);
    const log = await prisma.workoutRecord.updateMany({
      where: {
        userId: userId,
        scheduledDate: { gte: today, lte: tomorrow },
        isComplete: false,
        workoutId: workoutId,
      },
      data: { isComplete: true, completeDate: new Date() },
    });
    console.log(log);
    return;
  },
};
