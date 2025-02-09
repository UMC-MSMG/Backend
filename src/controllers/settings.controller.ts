import { RequestHandler } from "express";
import { prisma } from "../db.config";
import {
  UpdateFontSizeRequest,
  UpdateFontSizeResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  ErrorResponse,
} from "../types/settings.types";


/**
 * 글씨 크기 수정
 */
export const updateFontSize: RequestHandler<{}, UpdateFontSizeResponse, UpdateFontSizeRequest> = async (req, res) => {
  try {
    const { userId, fontSize } = req.body;

    if (!userId || ![1, 2, 3].includes(fontSize)) {
      res.status(400).json({ error: "유효하지 않은 요청입니다.", statusCode: 400 });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { fontSize },
    });

    res.json({ message: "글씨 크기가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("글씨 크기 수정 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};

/**
 * 내 정보 조회
 */
export const getUserProfile: RequestHandler<{ userId: string }, GetUserProfileResponse> = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      res.status(400).json({ error: "유효하지 않은 사용자 ID입니다.", statusCode: 400 });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        gender: true,
        height: true,
        weight: true,
        phoneNumber: true,
        image: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "사용자를 찾을 수 없습니다.", statusCode: 404 });
      return;
    }

    res.json({
      userId: user.id,
      profileImage: user.image || undefined,
      name: user.name,
      gender: user.gender || undefined,
      height: user.height || undefined,
      weight: user.weight || undefined,
      phoneNumber: user.phoneNumber || undefined,
    });
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};

/**
 * 내 정보 수정
 */
export const updateUserProfile: RequestHandler<{}, UpdateUserProfileResponse, UpdateUserProfileRequest> = async (
  req,
  res
) => {
  try {
    const { userId, profileImage, name, gender, height, weight, phoneNumber } = req.body;

    if (!userId) {
      res.status(400).json({ error: "userId가 필요합니다.", statusCode: 400 });
      return;
    }

    // 기존 사용자 데이터 조회
    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!existingUser) {
        res.status(404).json({ error: "사용자를 찾을 수 없습니다.", statusCode: 404 });
        return;
    }

    // 빈 문자열("")이나 null 값 필터링
    const isValidValue = (value: any) => value !== undefined && value !== null && value !== "";


    // 요청 값이 null, 빈 문자열("") 또는 undefined일 경우 기존 값을 유지
    const updateData = {
        image: isValidValue(profileImage) ? profileImage : existingUser.image,
        name: isValidValue(name) ? name : existingUser.name,
        gender: isValidValue(gender) ? gender : existingUser.gender,
        height: isValidValue(height) ? height : existingUser.height,
        weight: isValidValue(weight) ? weight : existingUser.weight,
        phoneNumber: isValidValue(phoneNumber) ? phoneNumber : existingUser.phoneNumber,
    }
  
    // 사용자 정보 업데이트
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({ message: "사용자 정보가 성공적으로 업데이트되었습니다." });
  } catch (error) {
    console.error("사용자 정보 수정 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};
