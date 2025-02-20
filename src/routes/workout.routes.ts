import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { workoutController } from "../controllers/workout.controller";

const router = express.Router();

router.patch("/complete", verifyToken, workoutController.completeWorkout);

export default router;
