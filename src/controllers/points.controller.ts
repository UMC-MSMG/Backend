import { Request, Response } from "express";
import {
  GetUserPointResponse,
  AddUserPointRequest,
  AddUserPointResponse,
  UseUserPointRequest,
  UseUserPointResponse,
} from "../types/points.types";
import {
  getUserPointService,
  addUserPointService,
  useUserPointService,
} from "../services/points.service";

export const getUserPoint = async (
  req: Request,
  res: Response<GetUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const points = await getUserPointService(userId);
    res.json({
      userId,
      points,
      message: "포인트 조회 성공",
    });
  } catch (error) {
    res.status(500).json({
      userId,
      points: 0,
      message: "Internal server error",
    });
  }
};

export const addUserPoint = async (
  req: Request<{ userId: string }, {}, AddUserPointRequest>,
  res: Response<AddUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { missionId, points, title, context } = req.body;

  try {
    const totalPoints = await addUserPointService(userId, points);
    res.json({
      userId,
      points,
      totalPoints,
      missionId,
      message: "포인트가 성공적으로 적립되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      userId,
      points: 0,
      totalPoints: 0,
      missionId,
      message: "Internal server error",
    });
  }
};

export const useUserPoint = async (
  req: Request<{ userId: string }, {}, UseUserPointRequest>,
  res: Response<UseUserPointResponse>
) => {
  const userId = parseInt(req.params.userId, 10);
  const { points, title, context } = req.body;
  try {
    const totalPoints = await useUserPointService(userId, points);
    if (totalPoints < 0) {
      return res.status(400).json({
        userId,
        points,
        totalPoints,
        message: "포인트가 부족합니다.",
      });
    }
    res.json({
      userId,
      points,
      totalPoints,
      message: "포인트가 성공적으로 사용 되었습니다.",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Insufficient points") {
      return res.status(400).json({
        userId,
        points,
        totalPoints: 0,
        message: "포인트가 부족합니다.",
      });
    }
    res.status(500).json({
      userId,
      points: 0,
      totalPoints: 0,
      message: "Internal server error",
    });
  }
};
