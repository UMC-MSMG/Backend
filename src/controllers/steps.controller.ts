import { Request, Response } from "express";
import {
  GetUserStepsResponse,
  AddUserStepsRequest,
  AddUserStepsResponse,
} from "../types/steps.types";

// 사용자 걸음수 조회
export const getUserSteps = async (
  req: Request,
  res: Response<GetUserStepsResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const steps = 5000; // 나중에 DB에서 조회
  res.json({
    userId,
    steps,
    message: "걸음수 조회 성공",
  });
};

// 걸음수 추가
export const addUserSteps = async (
  req: Request<{ userId: string }, {}, AddUserStepsRequest>,
  res: Response<AddUserStepsResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { steps } = req.body;

  const totalSteps = 7000; // 나중에 DB에서 기존 걸음수를 가져와 더하기
  res.json({
    userId,
    steps,
    totalSteps,
    message: "걸음수가 성공적으로 추가되었습니다.",
  });
};
