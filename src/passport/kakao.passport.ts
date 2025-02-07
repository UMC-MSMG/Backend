import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import dotenv from "dotenv";
import { prisma } from "../db.config";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import {
  findUserByKakaoId,
  createUserByKakaoLogin,
  updateRefreshToken,
} from "../repositories/auth.repository";

dotenv.config();

// 프로필 이미지 추가하기
export default function initializeKakaoStrategy() {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        callbackURL: "/api/auth/kakao/callback",
      },
      /*
       * clientID에 카카오 앱 아이디 추가
       * callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
       * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰, 여기서는 사용하지 않음, 카카오와 추가 요청을 할 때 사용
       * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
       */
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);

        //db 조회 후 회원가입 로직
        try {
          console.log("카카오 프로필 정보:", profile);

          // 카카오 프로필 정보에서 데이터 추출
          const kakaoId = profile.id.toString();
          const nickname = profile.displayName;
          const profileImage =
            profile._json?.kakao_account?.profile?.thumbnail_image_url || null;

          // 기존 유저 확인
          let user = await findUserByKakaoId(kakaoId);

          if (!user) {
            // 신규 유저 생성
            user = await createUserByKakaoLogin(
              kakaoId,
              nickname,
              profileImage
            );
          }

          // JWT 생성
          const accessToken = generateAccessToken(user.id);
          const refreshToken = generateRefreshToken(user.id);

          // Refresh Token DB 저장
          await updateRefreshToken(user.id, refreshToken);

          return done(null, { user, accessToken, refreshToken });
        } catch (error) {
          console.error("카카오 로그인 중 오류 발생:", error);
          return done(error, null);
        }
      }
    )
  );
}
