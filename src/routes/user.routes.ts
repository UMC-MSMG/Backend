import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

// 회원가입 엔드포인트 정의
router.post("/signup", userController.createUser);
router.get("/info/:id", userController.getUserInfo);
router.put("/users/:userId", userController.updateUser);
router.get("/all", userController.getAllUsers);


export default router;
