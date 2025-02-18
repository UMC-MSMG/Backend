import { Request, Response } from "express";
import { WorkoutCategoryService } from "../services/workoutCategory.service";
import { WorkoutCategoryDto } from "../dtos/workoutCategory.dto";
import { WorkoutLevel } from '@prisma/client';


export class WorkoutCategoryController {

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: 카테고리별 운동 목록 조회
 *     tags: [WorkoutCategory]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: integer
 *         required: true
 *         description: 사용자의 운동 레벨 (1: 초급, 2: 중급, 3: 고급)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 운동 카테고리 ID (1: 유산소, 2: 근력, 3: 균형, 4: 유연성)
 *     responses:
 *       200:
 *         description: 운동 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 운동 ID
 *                       name:
 *                         type: string
 *                         description: 운동 이름
 */



  getWorkoutList=async (req: Request, res: Response) =>{
    try {
      //사용자 정보가져오기 
      const user =req.user;
      if (!user) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }
      //클라이언트에서 카테고리 id 받기

    const { categoryId } = req.query;
      if (!categoryId) {
        return res.status(400).json({ message: "categoryId를 입력하세요." });
      }
    
    //workoutLevel을 사용자의 정보에서 가져오기
    const workoutLevel = user.workoutLevel as WorkoutLevel;

    // WorkoutLevel enum으로 변환 (필수)
     if (!Object.values(WorkoutLevel).includes(workoutLevel)) {
       return res.status(400).json({ message: "유효하지 않은 운동 레벨입니다." });
     }  

    
     //DTO 생성 후 매핑핑 
     const dto = new WorkoutCategoryDto();
     //dto.workoutLevel =user.workoutLevel as WorkoutLevel;// User 모델의 workoutLevel 사용
     dto.workoutLevel =workoutLevel;
     dto.categoryId = Number(categoryId); //카테고리 ID 숫자로 변환


     // 서비스 레이어 호출
     const workouts = await WorkoutCategoryService.getWorkoutsByCategoryAndLevel(
      dto.workoutLevel,
      dto.categoryId
    );



      return res.status(200).json({ success:true, workouts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류 발생" });
    }
  }
}
