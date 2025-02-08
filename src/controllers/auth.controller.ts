import { Request, Response, NextFunction } from "express";
import {
  PhoneVerificationRequest,
  PhoneVerificationCodeRequest,
  LoginRequest,
  LoginResponse,
  VerificationResponse,
} from "../types/auth.types";
import { AuthService, Verification } from "../services/auth.service";

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

  static async sendLoginCode(req: Request, res: Response): Promise<any> {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = '[ 로그인 ] 전화번호 인증 코드 전송'
    #swagger.description = '로그인에 필요한 전화번호 인증 코드 전송 API'

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        phoneNum: {
                            type: "string",
                            example: "01012345678"
                        }
                    },
                    required: ["phoneNum"]
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: "인증 코드 전송 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "인증번호가 전송되었습니다." }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "잘못된 요청 (휴대폰 번호 미입력)",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "휴대폰 번호를 입력해주세요" }
                    }
                }
            }
        }
    }

    #swagger.responses[404] = {
        description: "존재하지 않는 휴대폰 번호",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "존재하지 않는 휴대폰 번호입니다." }
                    }
                }
            }
        }
    }

    #swagger.responses[500] = {
        description: "서버 오류",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "서버 오류가 발생했습니다." }
                    }
                }
            }
        }
    }
*/

    try {
      const phoneNum = req.body.phoneNum;
      console.log(phoneNum);
      if (!phoneNum) {
        return res
          .status(400)
          .json({ success: false, message: "휴대폰 번호를 입력해주세요" });
      }
      const isUser: boolean = await Verification.isPhoneNum(phoneNum);
      console.log(isUser);
      if (!isUser) {
        res.status(404).json({
          success: false,
          message: "존재하지 않는 휴대폰 번호입니다.",
        });
        return;
      }
      const result = await Verification.sendCode(phoneNum);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류:", error);
      res.status(500).json({ message: error });
    }
  }

  static async verifyLoginCode(req: Request, res: Response): Promise<any> {
    try {
      const { phoneNum, code } = req.body;
      if (!phoneNum || !code) {
        return res.status(400).json({
          success: false,
          message: "휴대폰 번호와 인증번호가 필요합니다.",
        });
      }
      const result = await Verification.verifyLoginCode(phoneNum, code);
      if (!result.success) {
        return res.status(400).json(result);
      }
    } catch (error) {}
  }
}
