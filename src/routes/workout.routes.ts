import { Router } from "express";
import {
  getWorkoutsByCategory,
  logWorkout,
} from "../controllers/workout.controller";

const router = Router();

router.get("/", getWorkoutsByCategory);
router.post("/log/:userId", logWorkout);

export default router;
