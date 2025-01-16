import { Request, Response } from "express";

export const getWorkoutsByCategory = (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const workouts = [
    { exerciseId: 1, exerciseName: "스쿼트" },
    { exerciseId: 2, exerciseName: "윗몸일으키기" },
    { exerciseId: 3, exerciseName: "제자리뛰기" },
  ];
  res.json(workouts);
};