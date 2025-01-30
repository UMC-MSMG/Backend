import { Request, Response } from "express";
import { prisma } from "../db.config";
import {
  GetUserStepsResponse,
  AddUserStepsRequest,
  AddUserStepsResponse,
} from "../types/steps.types";

// 사용자 걸음수 조회
export const getUserSteps = async (
    req: Request<{ userId: string }, {}, {}, { date?: string }>,
  res: Response<GetUserStepsResponse | ErrorResponse>
) => {
    try {
    const userId = parseInt(req.params.userId, 10);
    const date = req.query.date;

    // 요청 데이터 검증
    if (isNaN(userId) || !date) {
        return res.status(400).json({
          error: "유효하지 않은 요청입니다. userId와 date를 확인하세요.",
          statusCode: 400,
        });
    }
  
    if (isNaN(Date.parse(date))) {
        return res.status(400).json({
          error: "유효하지 않은 날짜 형식입니다. (예: YYYY-MM-DD)",
          statusCode: 400,
        });
    }
  
    const parsedDate = new Date(date);
    
    // 데이터베이스에서 해당 날짜의 걸음수 조회
    const userSteps = await prisma.step_count.findFirst({
        where: {
          user_id: userId,
          date: parsedDate,
        },
      });
  
      if (!userSteps) {
        return res.status(404).json({
          userId,
          steps: 0,
          message: "해당 날짜의 걸음수 데이터가 존재하지 않습니다.",
        });
      }
   
    if (!userSteps) {
      return res.status(404).json({
        userId,
        steps: 0,
        message: "걸음수 데이터가 존재하지 않습니다.",
    });
    }
   
    res.json({
        userId,
        steps:userSteps.steps,
        message: "걸음수 조회 성공",
    });

    console.log(`GET /steps/${userId}?date=${date} 호출됨`); // 요청 확인 로그
        
} catch (error) {
    console.error("걸음수 조회 실패:", error);
    res.status(500).json({
        error: "걸음수 조회 중 오류가 발생했습니다.",
        statusCode: 500,
      });
}
};

// 사용자 걸음수 추가
export const addUserSteps = async (
    req: Request, res: Response
  ) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { steps } = req.body;
  
      if (!steps || isNaN(userId)) {
        // 잘못된 요청 처리
        return res.status(400).json({
          message: "유효하지 않은 요청입니다. userId와 steps를 확인하세요.",
        });
      }
  
      // 가짜 데이터 (DB 연동 대신 사용)
      const totalSteps = 7000 + steps; // 기존 걸음수(7000)에 추가된 걸음수 합산
  
      /*
      // DB 연동 코드 예시
      const userSteps = await prisma.step_count.upsert({
        where: { user_id: userId },
        update: { steps: { increment: steps } },
        create: { user_id: userId, steps },
      });
      const totalSteps = userSteps.steps;
      */
  
      res.json({
        userId,
        steps,
        totalSteps,
        message: "걸음수가 성공적으로 추가되었습니다.",
      });
  
      // 디버깅 로그 출력
      console.log(`사용자 ${userId} 걸음수 ${steps} 추가됨. 총 걸음수: ${totalSteps}`);
    } catch (error) {
      console.error("걸음수 추가 실패:", error);
      res.status(500).json({ error: "걸음수 추가 중 오류가 발생했습니다." });
    }
  };
