import { Request, Response } from "express";
import {
  GetUserPointResponse,
  AddUserPointRequest,
  AddUserPointResponse,
  UseUserPointRequest,
  UseUserPointResponse,
} from "../types/point.types";

export const getUserPoint = async (
  req: Request,
  res: Response<GetUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const points = 1000; //나중에 DB에서 가져오기
  res.json({
    userId,
    points,
    message: "포인트 조회 성공",
  });
};

export const addUserPoint = async (
  req: Request<{ userId: string }, {}, AddUserPointRequest>,
  res: Response<AddUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { missionId, points, title, context } = req.body;
  const totalPoints = 1000; //나중에 DB 기존 포인트에서 사용 포인트 더하기
  res.json({
    userId,
    points,
    totalPoints,
    missionId,
    message: "포인트가 성공적으로 적립되었습니다.",
  });
};

export const useUserPoint = async (
  req: Request<{ userId: string }, {}, UseUserPointRequest>,
  res: Response<UseUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { points, title, context } = req.body;
  const totalPoints = 500; //나중에 DB 기존 포인트에서 사용 포인트 차감하기
  res.json({
    userId,
    points,
    totalPoints,
    message: "포인트가 성공적으로 사용 되었습니다.",
  });
};
