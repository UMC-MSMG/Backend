import { Router } from "express";
import { WorkoutDetailController } from "../controllers/workoutDetail.controller";

const router = Router();
const workoutDetailController = new WorkoutDetailController();

// 특정 운동의 상세 정보 조회 (workoutId 기반)
router.get("/:workoutId", workoutDetailController.getWorkoutDetail.bind);

export default router;
