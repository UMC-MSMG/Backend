import { prisma } from "../db.config";

// 카카오 ID로 사용자 찾기
export const findUserByKakaoId = async (kakaoId: string) => {
  try {
    return await prisma.user.findFirst({
      where: { kakaoId },
    });
  } catch (error) {
    console.error("findUserByKakaoId 에러:", error);
    throw new Error("사용자 조회 실패");
  }
};

// 카카오 로그인으로 회원가입
export const createUserByKakaoLogin = async (
  kakaoId: string,
  nickname: string,
  profileImage: string
) => {
  try {
    return await prisma.user.create({
      data: {
        kakaoId,
        name: nickname,
        image: profileImage || null,
      },
    });
  } catch (error) {
    console.error("createUserByKakaoLogin 에러:", error);
    throw new Error("회원가입 실패");
  }
};

// 리프레시 토큰 업데이트
export const updateRefreshToken = async (id: number, refreshToken: string) => {
  try {
    console.log("리포 유저 아이디", id);
    return await prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  } catch (error) {
    console.error("updateRefreshToken 에러:", error);
    throw new Error("리프레시 토큰 업데이트 실패");
  }
};

export const AuthRepository = {
  // 존재하는 전화번호인지 확인
  findPhoneNum: async (phoneNum: string) => {
    return await prisma.user.findFirst({
      where: { phoneNumber: phoneNum },
    });
  },
  createUserByPhone: async (phoneNum: string) => {
    const user = await prisma.user.create({ data: { phoneNumber: phoneNum } });
    console.log("프리즈마 유저", user.id);
    return user.id;
  },
};
