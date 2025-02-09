// steps.routes.ts

import { Router } from "express";
import { getUserSteps, addUserSteps } from "../controllers/steps.controller";

const router = Router();

// 날짜별 걸음수 조회: GET /api/steps/:userId?date=YYYY-MM-DD
router.get(
    "/:userId", 
    /*
    #swagger.tags = ['Steps']
    #swagger.summary = '사용자 걸음수 조회'
    #swagger.description = '특정 날짜에 대한 사용자의 걸음수를 조회합니다.'
    #swagger.parameters['userId'] = {
        in: "path",
        required: true,
        type: "integer",
        description: "조회할 사용자 ID"
    }
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
                    userId: { type: "integer" },
                    steps: { type: "integer" },
                    message: { type: "string", example: "걸음수 조회 성공" }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: "해당 날짜의 걸음수 데이터가 없음"
    }
    */
    getUserSteps);

// 날짜별 걸음수 추가: PUT /api/steps/:userId/add
router.put(
    "/:userId/add", 
    /*
    #swagger.tags = ['Steps']
    #swagger.summary = '사용자 걸음수 추가'
    #swagger.description = '특정 날짜의 사용자 걸음수를 추가(업데이트)합니다.'
    #swagger.parameters['userId'] = {
        in: "path",
        required: true,
        type: "integer",
        description: "걸음수를 추가할 사용자 ID"
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    steps: { type: "integer", description: "추가할 걸음수" },
                    date: { type: "string", format: "date", description: "걸음수를 추가할 날짜 (YYYY-MM-DD 형식)" }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "걸음수 추가 성공",
        content: {
            "application/json": {
                schema: {
                    userId: { type: "integer" },
                    steps: { type: "integer" },
                    totalSteps: { type: "integer" },
                    message: { type: "string", example: "걸음수가 성공적으로 추가되었습니다." }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "잘못된 요청"
    }
    */
    addUserSteps);

export default router;
