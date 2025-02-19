import express from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

// 회원가입 엔드포인트 정의

// 회원가입 후 정보 입력
router.patch("/signup-info", verifyToken, userController.updateSignupInfo);
router.get("/user-info", verifyToken, userController.getUserInfo);
// router.put("/users/:userId", userController.updateUser);

export default router;
