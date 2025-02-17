//settings.controller.ts

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
    const userId = req.user?.id; // JWT에서 userId 가져오기
    const { fontSize } = req.body;

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
 * 사용자 정보 수정
 */
export const updateUserProfile: RequestHandler<{}, UpdateUserProfileResponse, UpdateUserProfileRequest> = async (req,res) => {
  try {
    const userId = req.user?.id; // JWT에서 userId 가져오기
    const { profileImage, name, gender, height, weight, phoneNumber } = req.body;

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

    // 빈 값 필터링 함수
    const isValidValue = (value: any) => value !== undefined && value !== null && value !== "";


    // 요청 값이 비어 있으면 기존 값 유지
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
