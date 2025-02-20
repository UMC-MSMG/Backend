import { prisma } from "../db.config";

export class WorkoutCategoryRepository {
  static async findWorkouts(workoutLevel: string, categoryId: number) { // ✅ STRING 타입 사용
    return await prisma.workout.findMany({
      where: {
        categoryId: categoryId,
        level: {
          equals: workoutLevel.toUpperCase(), // ✅ 항상 대문자로 변환 후 비교
        },
        
      },
      select: {
        id: true,
        workoutName: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        categoryId: true,
        level: true,
      },
    });
  }
}
