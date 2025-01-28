import { Router } from "express";
import { getUserSteps, addUserSteps } from "../controllers/steps.controller";

const router = Router();

// 사용자 걸음수 조회
router.get("/:userId", getUserSteps);

// 사용자 걸음수 추가
router.put("/:userId/add", addUserSteps);

export default router;
