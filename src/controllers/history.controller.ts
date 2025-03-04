import { Request, Response, NextFunction } from "express";
import { historyService } from "../services/history.service";

export const historyController = {
  getSummary: async (req: Request, res: Response, next: NextFunction) => {
    /*
  #swagger.tags = ['History']
  #swagger.summary = '운동일지 요약 데이터 반환'
  #swagger.description = '사용자의 운동일지에 대한 요약 데이터를 반환합니다. (JWT 인증 필요)'
  #swagger.security = [{ "bearerAuth": [] }]

  #swagger.responses[200] = {
      description: "요약 정보 조회 성공",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      this_month_earnings: { 
                          type: "integer", 
                          example: 550, 
                          description: "이번 달 획득한 포인트" 
                      },
                      last_month_earnings: { 
                          type: "integer", 
                          example: 0, 
                          description: "지난 달 획득한 포인트" 
                      },
                      sequence_days: { 
                          type: "integer", 
                          example: 4, 
                          description: "연속 운동 일수" 
                      },
                      sequence_start: { 
                          type: "string", 
                          format: "date-time", 
                          example: "2025-02-16T00:00:00.000Z", 
                          description: "연속 운동 시작일" 
                      },
                      sequence_end: { 
                          type: "string", 
                          format: "date-time", 
                          example: "2025-02-19T06:50:57.228Z", 
                          description: "연속 운동 종료일" 
                      },
                      sequence_workouts: { 
                          type: "array",
                          description: "연속 운동 기록 목록",
                          items: {
                              type: "object",
                              properties: {
                                  workoutId: { 
                                      type: "integer", 
                                      example: 3, 
                                      description: "운동 ID" 
                                  },
                                  count: { 
                                      type: "integer", 
                                      example: 2, 
                                      description: "해당 운동 수행 횟수" 
                                  },
                                  workoutName: { 
                                      type: "string", 
                                      example: "무릎 굽혔다가 피기", 
                                      description: "운동 이름" 
                                  }
                              }
                          }
                      },
                      weekly_workout: { 
                          type: "object",
                          description: "주간 운동 여부",
                          properties: {
                              monday: { type: "boolean", example: true, description: "월요일 운동 여부" },
                              tuesday: { type: "boolean", example: true, description: "화요일 운동 여부" },
                              wednesday: { type: "boolean", example: true, description: "수요일 운동 여부" },
                              thursday: { type: "boolean", example: false, description: "목요일 운동 여부" },
                              friday: { type: "boolean", example: false, description: "금요일 운동 여부" },
                              saturday: { type: "boolean", example: false, description: "토요일 운동 여부" },
                              sunday: { type: "boolean", example: false, description: "일요일 운동 여부" }
                          }
                      },
                      workout_level: {
                          type: "string",
                          example: "NORMAL",
                          description: "사용자의 운동 레벨"
                      }
                  }
              }
          }
      }
  }

  #swagger.responses[401] = {
      description: "인증 실패 (토큰 없음)",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { 
                          type: "string", 
                          example: "사용자 인증이 필요합니다." 
                      }
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
                      message: { 
                          type: "string", 
                          example: "서버 오류" 
                      }
                  }
              }
          }
      }
  }
*/

    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }

      const userId = req.user.id;
      const summary = await historyService.getSummary(userId);

      res.status(200).json(summary);
    } catch (error) {
      console.error("요약 정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  getCalendar: async (req: Request, res: Response, next: NextFunction) => {
    /*
  #swagger.tags = ['History']
  #swagger.summary = '운동일지 달력 데이터 반환'
  #swagger.description = '해당 달의 운동한 일수와 번 돈을 반환합니다. (JWT 인증 필요)'
  #swagger.security = [{ "bearerAuth": [] }]

  #swagger.parameters['year'] = {
      in: "path",
      required: true,
      type: "string",
      example: 2025,
      description: "조회할 연도 (4자리 숫자, 예: 2025)"
  }

  #swagger.parameters['month'] = {
      in: "path",
      required: true,
      type: "string",
      example: "02",
      description: "조회할 월 두자리수로 (1~12, 예: 2월 → 02)"
  }

  #swagger.responses[200] = {
      description: "달력 데이터 조회 성공",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      month: { type: "string", example: "2025-02", description: "조회한 연도 및 월 (YYYY-MM)" },
                      monthly_workout_days: { type: "integer", example: 4, description: "해당 달 동안 운동한 총 일수" },
                      monthly_earnings: { type: "integer", example: 150, description: "해당 달 동안 번 포인트" }
                  }
              }
          }
      }
  }

  #swagger.responses[400] = {
      description: "잘못된 요청 (유효하지 않은 연도/월 입력)",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { type: "string", example: "Invalid year or month format" }
                  }
              }
          }
      }
  }

  #swagger.responses[401] = {
      description: "인증 실패 (토큰 없음 또는 유효하지 않음)",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
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
                      message: { type: "string", example: "서버 오류" }
                  }
              }
          }
      }
  }
*/

    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }
      const userId = req.user.id;
      const { year, month } = req.params;
      console.log("날짜", year, month);

      if (!/^\d{4}$/.test(year) || !/^\d{2}$/.test(month)) {
        res.status(400).json({ message: "Invalid year or month format" });
        return;
      }

      const data = await historyService.getCalendar(userId, year, month);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  getMainPageSummary: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /*
  #swagger.tags = ['History']
  #swagger.summary = '메인페이지 요약 데이터 반환'
  #swagger.description = '메인 페이지에 대한 요약 데이터를 반환합니다. (JWT 인증 필요)'
  #swagger.security = [{ "bearerAuth": [] }]

  #swagger.responses[200] = {
      description: "요약 정보 조회 성공",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      sequence_days: { 
                          type: "integer", 
                          example: 4, 
                          description: "연속 운동 일수" 
                      },
                      weekly_workout: { 
                          type: "object",
                          description: "주간 운동 여부",
                          properties: {
                              monday: { type: "boolean", example: true, description: "월요일 운동 여부" },
                              tuesday: { type: "boolean", example: true, description: "화요일 운동 여부" },
                              wednesday: { type: "boolean", example: true, description: "수요일 운동 여부" },
                              thursday: { type: "boolean", example: false, description: "목요일 운동 여부" },
                              friday: { type: "boolean", example: false, description: "금요일 운동 여부" },
                              saturday: { type: "boolean", example: false, description: "토요일 운동 여부" },
                              sunday: { type: "boolean", example: false, description: "일요일 운동 여부" }
                          }
                      },
                      workout_rate: { 
                          type: "integer", 
                          example: 50, 
                          description: "운동 수행 비율 (%)" 
                      },
                      point: { 
                          type: "integer", 
                          example: 940000, 
                          description: "사용자의 총 포인트" 
                      },
                     steps: { 
                          type: "integer", 
                          example: 3000, 
                          description: "사용자의 총 걸음 수" 
                      }
                  }
              }
          }
      }
  }

  #swagger.responses[401] = {
      description: "인증 실패 (토큰 없음)",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { 
                          type: "string", 
                          example: "사용자 인증이 필요합니다." 
                      }
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
                      message: { 
                          type: "string", 
                          example: "서버 오류" 
                      }
                  }
              }
          }
      }
  }
*/

    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }

      const userId = req.user.id;
      const summary = await historyService.getMainPageSummary(userId);

      res.status(200).json(summary);
    } catch (error) {
      console.error("요약 정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
};
