import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { workoutController } from "../controllers/workout.controller";
import { WorkoutRecordController } from "../controllers/workoutRecord.controller";

const router = express.Router();

router.patch("/complete", verifyToken, workoutController.completeWorkout);
router.post(
  "/records/generate",
  verifyToken,
  WorkoutRecordController.createThreeDayWorkout
);

export default router;
