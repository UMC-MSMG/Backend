import { Request, Response, NextFunction } from "express";
import { SignupRequest, UserInfoResponse } from "../types/user.types";
import * as userRepository from "../repositories/user.repository.ts"

// 회원가입 컨트롤러
export const createUser = async (
  req: Request<{}, {}, SignupRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone_number, birth_date, ...otherDetails } = req.body;

    // 여기서 사용자 등록 로직 추가
    const userId = "generated-user-id";

    res.status(201).json({
      message: "Signup successful",
      userId,
    });
  } catch (error) {
    next(error); // 에러 미들웨어로 전달
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response<UserInfoResponse>,
  next: NextFunction
) => {};

export const updateUser = async (
  req: Request,
  res: Response<UserInfoResponse>,
  next: NextFunction
) => {};

// 모든 회원 목록 조회 컨트롤러 추가
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};