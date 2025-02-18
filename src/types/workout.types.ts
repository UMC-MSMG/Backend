// Prisma의 workoutLevel과 동일한 Enum 타입 정의
export enum WorkoutLevel {
  HARD = "HARD",
  NORMAL = "NORMAL",
  EASY = "EASY",
}

export interface WorkoutCategoryDto {
  workoutLevel: WorkoutLevel; // 유저의 운동 레벨 (ENUM)
  categoryId: number; // 카테고리 ID
}

export interface Workout {
  id: number;
  workoutName: string;
  description?: string | null;
}

export interface GetWorkoutsByCategoryRequest {
  workoutLevel: WorkoutLevel; // 유저의 운동 레벨 (ENUM)
  categoryId: number; // 조회할 카테고리 ID
}

export interface GetWorkoutsByCategoryResponse {
  workouts: Workout[]; // 운동 목록 배열 반환
}

export interface WorkoutDetail {
  id: number;
  step: number;
  description: string;
  link?: string; // AWS S3 비디오 링크
}

export interface GetWorkoutDetailResponse {
  workoutDetails: WorkoutDetail[];
}

