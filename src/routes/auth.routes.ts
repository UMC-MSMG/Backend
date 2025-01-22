import { Router } from "express";
import {
  requestPhoneVerification,
  verifyPhoneCode,
  login,
  kakaoLogin,
} from "../controllers/auth.controller";
import passport from "passport";

///api/auth
const router = Router();

// 전화번호 인증 요청
router.post("/phone/verify", requestPhoneVerification);

// 인증 코드 확인
router.post("/phone/verify-code", verifyPhoneCode);

// 이메일/비밀번호 일반 로그인
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// 카카오 로그인
router.get("/login/kakao", passport.authenticate("kakao"));
//콜백
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login/kakao",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);
export default router;
