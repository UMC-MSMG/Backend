export interface WorkoutDetail {
  id: number;
  name: string;
  videoLink?: string;
  description?: string | null;
  videoName?: string;
}

export interface LogWorkoutRequest {
  exerciseId: number;
  duration: number; // Duration of the workout in minutes
}

export interface LogWorkoutResponse {
  message: string;
}

export interface GetWorkoutsByCategoryResponse {
  categories: WorkoutDetail[];
}
