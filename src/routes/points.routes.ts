import { Router } from "express";
import {
  getUserPoint,
  addUserPoint,
  useUserPoint,
} from "../controllers/points.controller";

const router = Router();

router.get("/:userId", getUserPoint);
router.put("/:userId/add", addUserPoint);
router.put("/:userId/use", useUserPoint);

export default router;
