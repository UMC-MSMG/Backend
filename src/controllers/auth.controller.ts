import { Request, Response, NextFunction } from "express";
import {
  PhoneVerificationRequest,
  PhoneVerificationCodeRequest,
  LoginRequest,
  LoginResponse,
  VerificationResponse,
} from "../types/auth.types";

// 전화번호 인증 요청
export const requestPhoneVerification = async (
  req: Request<{}, {}, PhoneVerificationRequest>,
  res: Response<VerificationResponse>,
  next: NextFunction
): Promise<void> => {};

// 인증 코드 확인
export const verifyPhoneCode = async (
  req: Request<{}, {}, PhoneVerificationCodeRequest>,
  res: Response<VerificationResponse>,
  next: NextFunction
): Promise<void> => {};

// 로그인
export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> => {};

// 카카오 로그인
export const kakaoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
