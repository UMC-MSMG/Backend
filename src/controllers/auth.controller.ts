import { Request, Response, NextFunction } from "express";
import {
  PhoneVerificationRequest,
  PhoneVerificationCodeRequest,
  LoginRequest,
  LoginResponse,
  VerificationResponse,
} from "../types/auth.types";
import { AuthService } from "../services/auth.service";

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

export class AuthController {
  static async kakaoCallback(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "카카오 로그인 실패" });
        return;
      }

      const response = await AuthService.processKakaoLogin(req.user);
      console.log(response);
      res.json(response);
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  }
}
