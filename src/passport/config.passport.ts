import passport from "passport";
// import initializeLocalStrategy from './local.passport';
import initializeKakaoStrategy from "./kakao.passport";

//passport 초기화 함수
export default function initializePassport() {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj as Express.User);
  });

  //초기화
  //   initializeLocalStrategy();
  initializeKakaoStrategy();
}
