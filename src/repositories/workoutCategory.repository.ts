import { prisma } from "../db.config";
import { WorkoutLevel } from '@prisma/client';


export class WorkoutCategoryRepository {
  static async findWorkouts( workoutLevel: WorkoutLevel , categoryId: number) {
    return await prisma.workout.findMany({
      where: {
        categoryId: categoryId,
        UserPastWorkout:{
          some:{
            User:{
              workoutLevel:workoutLevel,
            }
          }
        }
      },
      select: {
        id: true,
        workoutName: true,
        description: true,
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        categoryId:true,

      },
    });
  }
}
