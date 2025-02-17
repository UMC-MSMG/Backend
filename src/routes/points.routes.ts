import express from "express";
import { PointsController } from "../controllers/points.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/my-points", verifyToken, PointsController.getUserPoints);
router.patch("/add", verifyToken, PointsController.addUserPoints);
router.patch("/buy-product", verifyToken, PointsController.buyProduct);

export default router;
