import { Router } from "express";
import express from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "passport";

///api/auth
const router = Router();

// 전화번호 인증 요청
router.post("/login/phone/verify-request", AuthController.sendLoginCode);

// 인증 코드 확인
router.post("/login/phone/verify-check", AuthController.verifyLoginCode);
router.post("/signup/phone/verify-request", AuthController.sendSignupCode);
router.post("/signup/phone/verify-check", AuthController.verifySignupCode);

router.post("/test", AuthController.test);

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
router.get(
  "/login/kakao",
  /*
  #swagger.tags = ['Auth']
  #swagger.summary = '카카오 로그인 리다이렉트 API'
  #swagger.description = '카카오 로그인 페이지로 이동합니다'
  #swagger.responses[302] = {
       description: "카카오 로그인 페이지로 리디렉트"
  }
 */
  passport.authenticate("kakao")
);

// 카카오 로그인 콜백, jwt 반환 api
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/login/kakao" }),
  AuthController.kakaoCallback
);

export default router;
