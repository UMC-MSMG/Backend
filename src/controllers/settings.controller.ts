//settings.controller.ts

import { RequestHandler } from "express";
import { prisma } from "../db.config";
import {
  UpdateFontSizeRequest, UpdateFontSizeResponse,
  UpdateUserProfileRequest, UpdateUserProfileResponse,
  UpdateMedicationRequest, UpdateMedicationResponse,
  UpdateWorkoutLevelRequest,UpdateWorkoutLevelResponse,
} from "../types/settings.types";
import { Day, WorkoutLevel } from "@prisma/client"; // Prisma Enum 가져옴


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


/**
 * 운동 난이도 수정
 */
export const updateWorkoutLevel: RequestHandler<{},UpdateWorkoutLevelResponse,UpdateWorkoutLevelRequest> = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { workoutLevel } = req.body;

    // Prisma Enum 값(EASY, NORMAL, HARD)으로 변환
    const workoutLevelMapping: Record<string, WorkoutLevel> = {
      LOW: "EASY",
      MEDIUM: "NORMAL",
      HIGH: "HARD",
    };

    if (!userId || !workoutLevelMapping[workoutLevel]) {
      res.status(400).json({ error: "유효하지 않은 요청입니다.", statusCode: 400 });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { workoutLevel: workoutLevelMapping[workoutLevel] }, // Prisma Enum 변환
    });

    res.json({ message: "운동 난이도가 성공적으로 업데이트되었습니다." });
  } catch (error) {
    console.error("운동 난이도 수정 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};

/**
 * 복용 약물 추가
 */
export const addMedication: RequestHandler<{}, UpdateMedicationResponse, UpdateMedicationRequest> = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { medications } = req.body;

    if (!userId || !medications || medications.length === 0) {
      res.status(400).json({ error: "유효하지 않은 요청입니다.", statusCode: 400 });
      return;
    }

    await prisma.$transaction(
      medications.map((med) =>
        prisma.medication.create({
          data: {
            userId,
            medName: med.medName,
            description: med.description || "",
            MedicationDay: {
              create: med.medicationDays.map((day) => ({
                day: day as Day,
              })),
            },
            MedicationTime: {
              create: med.medicationTimes.map((time) => ({
                time: new Date(`1970-01-01T${time}:00Z`),
              })),
            },
          },
        })
      )
    );

    res.json({ message: "약물이 성공적으로 추가되었습니다." });
  } catch (error) {
    console.error("약물 추가 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};

/**
 * 복용 약물 삭제
 */
export const deleteMedication: RequestHandler<{ medicationId: string }, UpdateMedicationResponse, {}> = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { medicationId } = req.params;

    if (!userId || !medicationId) {
      res.status(400).json({ error: "유효하지 않은 요청입니다.", statusCode: 400 });
      return;
    }

    // 해당 사용자의 특정 약물 찾기
    const existingMedication = await prisma.medication.findFirst({
      where: { id: Number(medicationId), userId },
    });

    if (!existingMedication) {
      res.status(404).json({ error: "해당 약물을 찾을 수 없습니다.", statusCode: 404 });
      return;
    }

    // 약물 삭제 (관련된 복용 일정과 시간도 삭제됨)
    await prisma.medication.delete({
      where: { id: Number(medicationId) },
    });

    res.json({ message: "약물이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("약물 삭제 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다.", statusCode: 500 });
  }
};
