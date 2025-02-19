import express from "express";
import { getUserGifticons, getAllGifticons } from "../controllers/shop.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * 사용자가 구매한 기프티콘 조회
 * GET /api/shops/my-gifticons
 */
router.get("/my-gifticons", verifyToken, getUserGifticons);

/**
 * 전체 기프티콘 조회
 * GET /api/shops/products
 */
router.get("/products", getAllGifticons);

export default router;
