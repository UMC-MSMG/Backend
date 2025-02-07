import { Request, Response, NextFunction } from "express";
import { historyService } from "../services/history.service";

export const historyController = {
  getSummary: async (req: Request, res: Response, next: NextFunction) => {
    /*
  #swagger.tags = ['History']
  #swagger.summary = '운동일지 전반적인 데이터 반환'
  #swagger.description = '운동일지 전반적인 데이터 반환. (JWT 인증 필요)'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.responses[200] = {
      description: "요약 정보 조회 성공",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { type: "string", example: "" }
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
      const summary = await historyService.getSummary(userId);

      res.status(200).json(summary);
    } catch (error) {
      console.error("요약 정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  getCalendar: async (req: Request, res: Response, next: NextFunction) => {},
};
