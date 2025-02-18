import { WorkoutCategoryRepository } from "../repositories/workoutCategory.repository";
import { WorkoutLevel } from '@prisma/client';


export class WorkoutCategoryService {
  static async getWorkoutsByCategoryAndLevel( workoutLevel: WorkoutLevel, categoryId: number) {
    return await WorkoutCategoryRepository.findWorkouts(workoutLevel, categoryId);
  }
}
