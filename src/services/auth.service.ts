import { KakaoLoginResponseDto } from "../dtos/auth.dto";

export class AuthService {
  static async processKakaoLogin(user: any): Promise<KakaoLoginResponseDto> {
    try {
      if (!user) {
        throw new Error("카카오 로그인 실패");
      }

      return {
        message: "카카오 로그인 성공",
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      };
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류 발생:", error);
      throw new Error("카카오 로그인 실패");
    }
  }
}
