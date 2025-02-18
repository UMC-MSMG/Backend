import { Request, Response } from "express";
import { WorkoutDetailService } from "../services/workoutDetail.service";

export class WorkoutDetailController {

    /**
 * @swagger
 * tags:
 *   - name: WorkoutDetail
 *     description: Operations related to workout details.
 */

/**
 * @swagger
 * /workout-detail/{id}:
 *   get:
 *     summary: 운동 상세 단계 정보 조회
 *     tags: [WorkoutDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 운동 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 운동 단계별 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 단계 ID
 *                   step:
 *                     type: integer
 *                     description: 단계 번호
 *                   description:
 *                     type: string
 *                     description: 단계 설명
 *                   link:
 *                     type: string
 *                     description: 운동 영상 링크 (AWS S3)
 *       404:
 *         description: 운동을 찾을 수 없음
 *       500:
 *         description: 서버 내부 오류
 */


  async getWorkoutDetail(req: Request, res: Response) {
    try {
      const { workoutId } = req.params;
      if (!workoutId) {
        return res.status(400).json({ message: "workoutId를 입력하세요." });
      }

      const workoutDetails = await WorkoutDetailService.getWorkoutDetail(Number(workoutId));
//getWorkoutDetailsById
      if (!workoutDetails.length) {
        return res.status(404).json({ message: "해당 운동의 상세 정보가 없습니다." });
      }

      return res.status(200).json({ workoutDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류 발생" });
    }
  }
}
