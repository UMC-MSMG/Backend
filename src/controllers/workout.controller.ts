import { Request, Response, NextFunction } from "express";
import { workoutService } from "../services/workout.service";
import { WorkoutCompleteDto } from "../dtos/workout.dto";

export const workoutController = {
  completeWorkout: async (req: Request, res: Response, next: NextFunction) => {
    /*
    #swagger.tags = ['Workout']
    #swagger.summary = '[운동 완료] 운동 기록 업데이트'
    #swagger.description = '사용자가 완료한 운동을 기록하고 포인트를 지급하는 API'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        workoutId: {
                            type: "array",
                            items: { type: "integer" },
                            example: [1, 2, 3]
                        }
                    },
                    required: ["workoutId"]
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: "운동 완료 처리 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        pointsEarned: { type: "integer", example: 10 }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "잘못된 요청 (workoutId가 배열이 아닐 경우)",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "workoutId는 배열이어야 합니다." }
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
                        message: { type: "string", example: "사용자 인증이 필요합니다." }
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
                        message: { type: "string", example: "서버 오류가 발생했습니다." }
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

      // ✅ req.body에서 workoutId 배열을 추출
      const { workoutId } = req.body;

      // ✅ workoutId가 배열이 아닌 경우 에러 처리
      if (!Array.isArray(workoutId)) {
        throw res
          .status(400)
          .json({ message: "workoutId는 배열이어야 합니다." });
      }

      // ✅ DTO 변환
      const workoutData: WorkoutCompleteDto = {
        userId,
        workoutList: workoutId,
      };

      // ✅ 서비스 호출
      const point = await workoutService.completeWorkout(workoutData);

      res.status(200).json({ success: true, pointsEarned: point });
    } catch (error) {
      console.error("정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
};
