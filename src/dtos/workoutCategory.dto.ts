import { WorkoutLevel } from '@prisma/client';


export class WorkoutCategoryDto {
    workoutLevel!: WorkoutLevel;
    categoryId!: number;
  }
  