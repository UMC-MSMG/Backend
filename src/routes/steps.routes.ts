import { Router } from "express";
import { getUserSteps, addUserSteps } from "../controllers/steps.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// 날짜별 걸음수 조회: GET /api/steps?date=YYYY-MM-DD
router.get(
    "/", 
    verifyToken, 
    /*
    #swagger.tags = ['Steps']
    #swagger.summary = '사용자 걸음수 조회'
    #swagger.description = '특정 날짜에 대한 사용자의 걸음수를 조회합니다.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['date'] = {
        in: "query",
        required: true,
        type: "string",
        format: "date",
        description: "조회할 날짜 (YYYY-MM-DD 형식)"
    }
    #swagger.responses[200] = {
        description: "걸음수 조회 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        userId: { type: "integer" },
                        steps: { type: "integer" },
                        message: { type: "string", example: "걸음수 조회 성공" }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: "해당 날짜의 걸음수 데이터가 없음"
    }
    */
    getUserSteps
);

// 날짜별 걸음수 추가: PUT /api/steps/add
router.put(
    "/add", 
    verifyToken,
    /*
    #swagger.tags = ['Steps']
    #swagger.summary = '사용자 걸음수 저장'
    #swagger.description = '특정 날짜의 사용자 걸음수를 저장합니다.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["steps", "date"],
                    properties: {
                        steps: {
                            type: "integer",
                            example: 5000,
                            description: "저장할 걸음수"
                        },
                        date: {
                            type: "string",
                            format: "date",
                            example: "2025-02-18",
                            description: "걸음수를 저장할 날짜 (YYYY-MM-DD 형식)"
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "걸음수 저장 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        userId: { type: "integer" },
                        totalSteps: { type: "integer" },
                        message: { type: "string", example: "걸음수가 성공적으로 업데이트되었습니다." }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "잘못된 요청"
    }
    */
    addUserSteps
);

export default router;