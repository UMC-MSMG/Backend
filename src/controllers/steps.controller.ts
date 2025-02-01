// steps.controller.ts

import { RequestHandler } from "express";
import { prisma } from "../db.config";
import {
  GetUserStepsResponse,
  AddUserStepsRequest,
  AddUserStepsResponse,
  ErrorResponse,
} from "../types/steps.types";

// 날짜별 걸음수 조회
export const getUserSteps: RequestHandler<
  { userId: string },
  GetUserStepsResponse,
  {},
  { date?: string }
> = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const dateQuery = req.query.date;

    if (isNaN(userId) || !dateQuery) {
      res.status(400).json({
        error: "유효하지 않은 요청입니다. userId와 date를 확인하세요.",
        statusCode: 400,
      });
      return;
    }

    if (isNaN(Date.parse(dateQuery))) {
      res.status(400).json({
        error: "유효하지 않은 날짜 형식입니다. (예: YYYY-MM-DD)",
        statusCode: 400,
      });
      return;
    }

    const parsedDate = new Date(dateQuery);
    parsedDate.setHours(0, 0, 0, 0);

    const userSteps = await prisma.stepCount.findFirst({
      where: {
        userId: userId,
        date: parsedDate,
      },
    });

    if (!userSteps) {
      res.status(404).json({
        userId,
        steps: 0,
        message: "해당 날짜의 걸음수 데이터가 존재하지 않습니다.",
      });
      return;
    }

    console.log(`GET /steps/${userId}?date=${dateQuery} 호출됨`);
    res.json({
      userId,
      steps: userSteps.steps,
      message: "걸음수 조회 성공",
    });
  } catch (error) {
    console.error("걸음수 조회 실패:", error);
    res.status(500).json({
      error: "걸음수 조회 중 오류가 발생했습니다.",
      statusCode: 500,
    });
  }
};

// 날짜별 걸음수 추가 (업데이트/등록)
export const addUserSteps: RequestHandler<
  { userId: string },
  AddUserStepsResponse,
  AddUserStepsRequest
> = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { steps, date } = req.body;

    if (isNaN(userId) || steps == null || !date) {
      res.status(400).json({
        error: "유효하지 않은 요청입니다. userId, steps, 그리고 date를 확인하세요.",
        statusCode: 400,
      });
      return;
    }

    const stepCount = Number(steps);
    if (isNaN(stepCount)) {
      res.status(400).json({
        error: "steps 값이 숫자가 아닙니다.",
        statusCode: 400,
      });
      return;
    }

    if (isNaN(Date.parse(date))) {
      res.status(400).json({
        error: "유효하지 않은 날짜 형식입니다. (예: YYYY-MM-DD)",
        statusCode: 400,
      });
      return;
    }

    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    const userSteps = await prisma.stepCount.upsert({
      where: {
        userId_date: { userId: userId, date: parsedDate },
      },
      update: {
        steps: { increment: stepCount },
      },
      create: {
        userId: userId,
        date: parsedDate,
        steps: stepCount,
      },
    });

    console.log(
      `사용자 ${userId}의 ${date} 날짜에 걸음수 ${stepCount} 추가됨. 총 걸음수: ${userSteps.steps}`
    );
    res.json({
      userId,
      steps: stepCount,
      totalSteps: userSteps.steps,
      message: "걸음수가 성공적으로 추가되었습니다.",
    });
  } catch (error) {
    console.error("걸음수 추가 실패:", error);
    res.status(500).json({
      error: "걸음수 추가 중 오류가 발생했습니다.",
      statusCode: 500,
    });
  }
};
