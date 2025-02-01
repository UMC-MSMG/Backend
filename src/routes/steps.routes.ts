// steps.routes.ts

import { Router } from "express";
import { getUserSteps, addUserSteps } from "../controllers/steps.controller";

const router = Router();

// 날짜별 걸음수 조회: GET /api/steps/:userId?date=YYYY-MM-DD
router.get("/:userId", getUserSteps);

// 날짜별 걸음수 추가: PUT /api/steps/:userId/add
router.put("/:userId/add", addUserSteps);

export default router;
