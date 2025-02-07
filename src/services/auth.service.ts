import { KakaoLoginResponseDto } from "../dtos/auth.dto";

export class AuthService {
  static async processKakaoLogin(user: any): Promise<KakaoLoginResponseDto> {
    try {
      if (!user) {
        throw new Error("카카오 로그인 실패");
      }
      console.log(user);
      console.log("id: ", user.user.id);

      return {
        message: "카카오 로그인 성공",
        user: {
          id: user.user.id,
          name: user.user.name,
          image: user.user.image,
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
