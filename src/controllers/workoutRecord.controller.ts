import { Request, Response } from "express";
import { WorkoutRecordService } from "../services/workoutRecord.service";

const workoutRecordService = new WorkoutRecordService();

export class WorkoutRecordController {
  static async createWeeklyWorkout(req: Request, res: Response) {
    /*
    #swagger.tags = ['Workout']
    #swagger.summary = '[운동 스케줄 생성] 일주일치 운동 기록 생성'
    #swagger.description = '오늘부터 7일 동안 하루 8개의 운동 기록을 생성합니다. 이미 존재하는 경우 생성하지 않습니다.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.responses[201] = {
        description: "운동 스케줄이 업데이트되었습니다.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Workout schedule updated" },
                        created: { type: "integer", example: 56 }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "잘못된 요청 (토큰 문제)",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Invalid token" }
                    }
                }
            }
        }
    }

    #swagger.responses[401] = {
        description: "사용자 인증 필요",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Unauthorized" }
                    }
                }
            }
        }
    }

    #swagger.responses[500] = {
        description: "서버 오류",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Internal Server Error" }
                    }
                }
            }
        }
    }
*/

    try {
      if (!req.user) {
        throw res.status(401).json({ message: "사용자 인증이 필요합니다." });
      }
      const userId = req.user.id;

      if (!userId) {
        throw res.status(400).json({ message: "User ID is required" });
      }

      const result = await workoutRecordService.generateWeeklyWorkout(userId);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
