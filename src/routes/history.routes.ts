import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { historyController } from "../controllers/history.controller";

const router = express.Router();

router.get("/summary", verifyToken, historyController.getSummary);
router.get(
  "/calendar/:year/:month",
  verifyToken,
  historyController.getCalendar
);
router.get("/main-page", verifyToken, historyController.getMainPageSummary);

export default router;
