import { Router } from "express";
import { getWorkoutsByCategory } from "../controllers/workout.controller";

const router = Router();

router.get("/:categoryId", getWorkoutsByCategory);

export default router;
