import { Router } from "express";
import express from "express";
import {
  requestPhoneVerification,
  verifyPhoneCode,
  login,
  AuthController,
} from "../controllers/auth.controller";
import passport from "passport";
import { authenticateJWT } from "../middleware/auth.middleware";

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

// 카카오 로그인 콜백, jwt 반환 api
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/login/kakao" }),
  AuthController.kakaoCallback
);

// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", { failureRedirect: "/login/kakao" }),
//   (req: express.Request, res: express.Response): void => {
//     if (!req.user) {
//       res.status(401).json({ message: "카카오 로그인 실패" });
//       return;
//     }

//     const { user, accessToken, refreshToken } = req.user as {
//       user: any;
//       accessToken: string;
//       refreshToken: string;
//     };

//     res.json({
//       message: "카카오 로그인 성공",
//       user: {
//         id: user.id,
//         name: user.name,
//         image: user.image,
//       },
//       accessToken,
//       refreshToken,
//     });
//     console.log(res);
//   }
// );

// router.get("/me", authenticateJWT, async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: { id: req.user.userId },
//   });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// });

export default router;
