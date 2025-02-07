import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { historyController } from "../controllers/history.controller";

const router = express.Router();

router.get("/summary", verifyToken, historyController.getSummary);
router.get("/calendar", verifyToken, historyController.getCalendar);

export default router;
