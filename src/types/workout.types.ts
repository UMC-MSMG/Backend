export interface Workout {
  exerciseId: bigint;
  exerciseName: string;
}

export interface LogWorkoutRequest {
  exerciseId: number;
  duration: number; // Duration of the workout in minutes
}

export interface LogWorkoutResponse {
  message: string;
}

export interface GetWorkoutsByCategoryResponse {
  categories: Workout[];
}
