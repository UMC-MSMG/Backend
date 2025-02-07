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
                      medications: {
                          type: "array",
                          description: "복용 중인 약물 목록",
                          items: {
                              type: "object",
                              properties: {
                                  medName: { type: "string", example: "string", description: "약물 이름" },
                                  description: { type: "string", example: "string", description: "약물 설명" },
                                  medicationDays: {
                                      type: "array",
                                      items: { type: "string", enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] },
                                      example: ["MON", "TUE"],
                                      description: "복용 요일"
                                  },
                                  medicationTimes: {
                                      type: "array",
                                      items: { type: "string", pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", example: "10:30" },
                                      example: ["10:30"],
                                      description: "복용 시간 (HH:MM)"
                                  }
                              }
                          }
                      },
                      agree_to_terms: { type: "boolean", example: true, description: "이용 약관 동의 여부" }
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
      //약물 정보 추가
      await userService.addMedications(userId, userData.medications);

      res
        .status(200)
        .json({ message: "회원 정보가 성공적으로 업데이트되었습니다." });
    } catch (error) {
      console.error("회원 정보 업데이트 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
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
