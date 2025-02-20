import { Request, Response, NextFunction } from "express";
import { SignupRequest, UserInfoResponse } from "../types/user.types";
import { SignupInfoDto } from "../dtos/user.dto";
import { userService } from "../services/user.service";

export const userController = {
  updateSignupInfo: async (req: Request, res: Response): Promise<void> => {
    /*
  #swagger.tags = ['Users']
  #swagger.summary = '회원가입 후 추가 정보 입력'
  #swagger.description = '회원가입 후 추가 정보를 입력합니다. (JWT 인증 필요)'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      name: { type: "string", example: "string", description: "사용자 이름" },
                      phone_number: { type: "string", example: "string", description: "휴대폰 번호" },
                      gender: { type: "string", enum: ["MALE", "FEMALE"], example: "MALE", description: "성별" },
                      birth_date: { type: "string", format: "date", example: "2025-02-02", description: "생년월일 (YYYY-MM-DD)" },
                      height: { type: "number", example: 0, description: "키 (cm)" },
                      weight: { type: "number", example: 0, description: "몸무게 (kg)" },
                      agree_to_terms: { type: "boolean", example: true, description: "이용 약관 동의 여부" },
                      workout_level: { type: "string", enum: ["HARD", "NORMAL","EASY"], example: "NORMAL", description: "운동 강도" },
                     ai_text: { type: "string", example: "ai 텍스트", description: "운동 강도" },
                  }
              }
          }
      }
  }
  #swagger.responses[200] = {
      description: "회원 정보 업데이트 성공",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { type: "string", example: "회원 정보가 성공적으로 업데이트되었습니다." }
                  }
              }
          }
      }
  }
  #swagger.responses[401] = {
      description: "인증 실패 (토큰 없음)",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      message: { type: "string", example: "사용자 인증이 필요합니다." }
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
                      message: { type: "string", example: "서버 오류" }
                  }
              }
          }
      }
  }
*/

    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }

      const userId = req.user.id;
      const userData: SignupInfoDto = req.body;

      //사용자 정보 업데이트
      await userService.updateNewUserInfo(userId, userData);

      res
        .status(200)
        .json({ message: "회원 정보가 성공적으로 업데이트되었습니다." });
    } catch (error) {
      console.error("회원 정보 업데이트 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  getUserInfo: async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Users']
    #swagger.summary = '사용자 정보 조회'
    #swagger.description = '현재 로그인한 사용자의 정보를 조회합니다.'

    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.responses[200] = {
        description: "사용자 정보 조회 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "number", example: 1 },
                        name: { type: "string", example: "김노인" },
                        kakaoId: { type: "string", example: "1231231" },
                        gender: { type: "string", enum: ["MALE", "FEMALE"], example: "MALE" },
                        phoneNumber: { type: "string", example: "01011112222" },
                        birthDate: { type: "string", format: "date-time", example: "2025-02-02T00:00:00.000Z" },
                        height: { type: "number", example: 170 },
                        weight: { type: "number", example: 70 },
                        deviceToken: { type: "string", nullable: true, example: null },
                        point: { type: "number", example: 940000 },
                        image: { type: "string", example: "http://k.kakaocdn.net/dn/cOGVzv/btsI07OSTgr/i9mY784WpokvIWmahAUj71/img_110x110.jpg" },
                        workoutLevel: { type: "string", enum: ["LOW", "NORMAL", "HIGH"], example: "NORMAL" },
                        fontSize: { type: "string", enum: ["SMALL", "NORMAL", "LARGE"], example: "NORMAL" },
                        refreshToken: { type: "string", example: "eyJh..." }
                    }
                }
            }
        }
    }

    #swagger.responses[401] = {
        description: "사용자 인증 필요",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "사용자 인증이 필요합니다." }
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
                        message: { type: "string", example: "서버 오류" }
                    }
                }
            }
        }
    }
  */

    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }

      const userId = req.user.id;
      const info = await userService.getUserInfo(userId);

      res.status(200).json(info);
    } catch (error) {
      console.error("정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
};

export const updateUser = async (
  req: Request,
  res: Response<UserInfoResponse>,
  next: NextFunction
) => {};

// // 모든 회원 목록 조회 컨트롤러 추가
// export const getAllUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const users = await userRepository.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };
