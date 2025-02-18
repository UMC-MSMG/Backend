import { Router } from "express";
import { WorkoutCategoryController } from "../controllers/workoutCategory.controller";

const router = Router();
const workoutCategoryController = new WorkoutCategoryController();
router.get("/list", workoutCategoryController.getWorkoutList.bind);
export default router;

//router.get("/", workoutCategoryController.getWorkoutList.bind(workoutCategoryController));

