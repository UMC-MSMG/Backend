import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import dotenv from "dotenv";
import { prisma } from "../db.config";

dotenv.config();

//이미지 추가하기
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
       * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
       * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
       */
      async (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        //db 조회 후 회원가입 로직
        try {
          // 카카오에서 보내준 profile 정보
          const kakaoId = profile.id.toString();
          const nickname = profile.displayName;
          const profileImage =
            profile._json?.kakao_account?.profile?.thumbnail_image_url || null;

          const user = await prisma.user.findFirst({
            where: { kakaoId: kakaoId },
          });

          // 이미 가입된 유저라면 로그인
          if (user) {
            return done(null, user);
          } else {
            // 가입되지 않은 유저라면 회원가입
            const newUser = await prisma.user.create({
              data: {
                kakaoId: kakaoId,
                name: nickname,
                image: profileImage,
              },
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error("카카오 로그인 중 오류 발생:", error);
        }

        return done(null, profile);
      }
    )
  );
}
