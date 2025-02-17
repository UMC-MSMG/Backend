// gpt.routes.ts
import express from "express";
import { gptController } from "../controllers/gpt.controller";

const router = express.Router();

/**
 * BMI 계산 및 운동 관련 질문 생성: POST /api/gpt/generate-questions
 */
router.post(
    "/generate-questions",
    /*
    #swagger.tags = ['ChatGPT']
    #swagger.summary = 'BMI 계산 및 운동 관련 질문 생성'
    #swagger.description = '사용자의 키와 몸무게를 입력하면 BMI를 계산하고, 비만도를 평가하여 운동 관련 질문을 생성합니다.'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        height: { type: "number", example: 175, description: "사용자 키 (cm)" },
                        weight: { type: "number", example: 70, description: "사용자 몸무게 (kg)" },
                        medications: { 
                            type: "array", 
                            items: { type: "string" },
                            example: ["혈압약"],
                            description: "사용자가 복용 중인 약물 리스트"
                        }
                    },
                    required: ["height", "weight"]
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "BMI 및 운동 관련 질문 반환",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        bmi: { type: "number", example: 22.86, description: "계산된 BMI 값" },
                        category: { type: "string", example: "정상", description: "BMI에 따른 비만도 평가" },
                        questions: {
                            type: "array",
                            items: { type: "string" },
                            example: ["하루 동안 얼마나 많이 걷나요?", "계단을 오르내릴 때 어려움이 있나요?"],
                            description: "운동 관련 질문 리스트"
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "잘못된 요청 (키 또는 몸무게 누락)"
    }
    #swagger.responses[500] = {
        description: "서버 오류"
    }
    */
    gptController.generateExerciseQuestions
);

/**
 * 운동 난이도 결정: POST /api/gpt/determine-level
 */
router.post(
    "/determine-level",
    /*
    #swagger.tags = ['ChatGPT']
    #swagger.summary = '사용자의 응답을 기반으로 운동 난이도 결정'
    #swagger.description = '사용자가 응답한 운동 관련 질문의 답변을 기반으로 운동 난이도를 분석합니다.'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        responses: {
                            type: "array",
                            items: { type: "string" },
                            example: ["하루 30분 미만", "어려움 있음", "넘어진 적 있음", "거의 안 함", "거의 안 함"],
                            description: "사용자의 질문 응답 리스트"
                        }
                    },
                    required: ["responses"]
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "운동 난이도 결정 결과 반환",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        fitnessLevel: { type: "string", example: "초급(하)", description: "사용자의 운동 난이도 (초급(하) / 초급(상) / 중급 / 고급)" }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "잘못된 요청 (응답 데이터 누락)"
    }
    #swagger.responses[500] = {
        description: "서버 오류"
    }
    */
    gptController.determineFitnessLevel
);

export default router;