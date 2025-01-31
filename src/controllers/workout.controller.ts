import { Request, Response, NextFunction } from "express";
import {
  LogWorkoutRequest,
  LogWorkoutResponse,
  GetWorkoutsByCategoryResponse,
  Workout,
} from "../types/workout.types";
import * as workoutRepository from "../repositories/workout.repository";

export const getWorkoutsByCategory = async (
  req: Request,
  res: Response<GetWorkoutsByCategoryResponse>,
  next: NextFunction
) => {
  try {
    const categories = await workoutRepository.getWorkoutsByCategory();
    const formattedCategories: Workout[] = categories.map((category) => ({
      exerciseId: Number(category.id), 
      exerciseName: category.name || "Unnamed Category",
    }));
    res.json({ categories: formattedCategories });
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
