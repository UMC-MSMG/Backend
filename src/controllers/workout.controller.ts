import { Request, Response, NextFunction } from "express";
import {
  LogWorkoutRequest,
  LogWorkoutResponse,
  GetWorkoutsByCategoryResponse,
  WorkoutDetail,
} from "../types/workout.types";
import * as workoutRepository from "../repositories/workout.repository";

export const getWorkoutsByCategory = async (
  req: Request,
  res: Response<GetWorkoutsByCategoryResponse>,
  next: NextFunction
) => {
  try {
    const exercises = await workoutRepository.getWorkoutsByCategory();
    const formattedWorkouts: WorkoutDetail[] = exercises.map((exercise) => ({
      id: Number(exercise.id),
      name: exercise.name || "",
    }));

    res.json({ categories: formattedWorkouts });
  } catch (error) {
    next(error);
  }
};

export const logWorkout = (
  req: Request<{ userId: string }, {}, LogWorkoutRequest>,
  res: Response<LogWorkoutResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { exerciseId, duration } = req.body;
  res.json({ message: "Workout logged successfully" });
};
