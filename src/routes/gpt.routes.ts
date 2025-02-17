// gpt.routes.ts
import express from "express";
import { gptController } from "../controllers/gpt.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { GPTQuestionResponse, GPTFitnessLevelResponse } from "../types/gpt.types";
import { GPTResponse } from "../types/response.types";

const router = express.Router();

/** BMI 계산 + 비만도 평가 + 운동 관련 질문 생성 */
router.get("/generate-questions", verifyToken, gptController.generateExerciseQuestions);

/** 사용자의 답변을 기반으로 운동 난이도 결정 */
router.post("/determine-level", verifyToken, gptController.determineFitnessLevel);

export default router;
