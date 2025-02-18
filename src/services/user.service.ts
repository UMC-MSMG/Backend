import { SignupInfoDto, MedicationDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

export const userService = {
  updateNewUserInfo: async (userId: number, userData: SignupInfoDto) => {
    try {
      console.log(userId);
      return await UserRepository.updateUserInfo(userId, userData);
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      throw new Error("사용자 정보 업데이트 실패");
    }
  },

  addMedications: async (userId: number, medications: MedicationDto[]) => {
    try {
      await UserRepository.deleteUserMedications(userId); // 기존 약물 삭제
      await UserRepository.addMedications(userId, medications); // 새로운 약물 추가
    } catch (error) {
      console.error("약물 정보 추가 중 오류 발생:", error);
      throw new Error("약물 정보 추가 실패");
    }
  },
  getUserInfo: async (userId: number) => {
    try {
      const info = UserRepository.getUserInfo(userId);
      return info;
    } catch (error) {
      throw new Error("사용자 정보 조회 실패");
    }
  },
};
