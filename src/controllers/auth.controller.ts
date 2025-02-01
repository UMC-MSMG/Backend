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
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = '카카오 로그인 콜백 API'
      #swagger.description = '카카오 로그인 성공 시 JWT 반환'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {description: "카카오 로그인 성공",
        content: {
            "application/json": {
                example: {
                    "message": "카카오 로그인 성공",
                    "user": {
                        "id": 1,
                        "name": "홍길동",
                        "image": "https://example.com/profile.jpg"
                    },
                    "accessToken": "eyJhbGciOiJIUz...",
                    "refreshToken": "eyJhbGciOiJIUz..."
                }
            }
        }
      }
      #swagger.responses[401] = {
          description: "로그인 실패"
      }
      #swagger.responses[500] = {
          description: "서버 오류"
      }
*/

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
