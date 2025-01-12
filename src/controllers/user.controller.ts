import { Request, Response, NextFunction } from "express";
import { SignupRequest, UserInfoResponse } from "../types/user.types";
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
