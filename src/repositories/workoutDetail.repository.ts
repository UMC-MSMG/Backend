//import { prisma } from "../models/prisma";
import { prisma } from "../db.config";

export class WorkoutDetailRepository {
  static async findWorkoutDetailsByWorkoutId(workoutId: number) {
    return await prisma.workoutDetail.findMany({
      where: { workoutId },
      select: {
        id: true,
        step: true,
        description: true,
        link: true, // AWS S3에 저장된 영상 링크
      },
    });
  }
}
