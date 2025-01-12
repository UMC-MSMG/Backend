import { Router } from "express";
import {
  requestPhoneVerification,
  verifyPhoneCode,
  login,
  kakaoLogin,
} from "../controllers/auth.controller";

const router = Router();

// 전화번호 인증 요청
router.post("/phone/verify", requestPhoneVerification);

// 인증 코드 확인
router.post("/phone/verify-code", verifyPhoneCode);

// 이메일/비밀번호 로그인
router.post("/login", login);

// 카카오 로그인
router.get("/oauth2/login/kakao", kakaoLogin);

export default router;
