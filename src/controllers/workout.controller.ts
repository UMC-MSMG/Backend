import { Request, Response } from "express";
import {
  LogWorkoutRequest,
  LogWorkoutResponse,
  GetWorkoutsByCategoryResponse,
  Workout,
} from "../types/workout.types";

export const getWorkoutsByCategory = (
  req: Request,
  res: Response<GetWorkoutsByCategoryResponse>
) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const workouts: Workout[] = [
    { exerciseId: 1, exerciseName: "스쿼트" },
    { exerciseId: 2, exerciseName: "윗몸일으키기" },
    { exerciseId: 3, exerciseName: "제자리뛰기" },
  ];
  res.json({ workouts });
};

export const logWorkout = (
  req: Request<{ userId: string }, {}, LogWorkoutRequest>,
  res: Response<LogWorkoutResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { exerciseId, duration } = req.body;
  res.json({ message: "Workout logged successfully" });
};
