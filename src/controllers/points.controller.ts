import { Request, Response, NextFunction } from "express";
import { PointsService } from "../services/points.service";
import { StatusCodes } from "http-status-codes";

export const PointsController = {
  getUserPoints: async (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.tags = ['Points']
      #swagger.summary = '사용자 포인트 조회'
      #swagger.description = '현재 로그인한 사용자의 포인트를 조회합니다.'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {
        description: "포인트 조회 성공",
        content: {
          "application/json": {
            schema: {
              user_id: 1,
              point: 1500,
              message: "포인트 조회 성공"
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: "사용자 인증 필요"
      }
        #swagger.responses[500] = {
        description: "서버 오류"
      }
    */
    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }
      const userId = req.user.id;
      const point = await PointsService.getUserPoints(userId);
      res
        .status(200)
        .json({ user_id: userId, point, message: "포인트 조회 성공" });
    } catch (error: any) {
      console.error("요약 정보 조회 중 오류:", error);
      if (error.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
      }
      res.status(500).json({ message: "서버 오류" });
    }
  },
  addUserPoints: async (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Points']
      #swagger.summary = '사용자 포인트 추가'
      #swagger.description = '현재 로그인한 사용자에게 포인트를 추가합니다.'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties:{
                points: {type: "number", example: "50"}
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: "포인트 추가 성공",
        content: {
          "application/json": {
            schema: {
            type: "object",
              properties:{  
                user_id: {type:"number", example: "1"},
                updated_point: {type:"number", example: "200"},
                message:{ type: "string", example: "포인트 추가 성공"}
                }
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: "사용자 인증 필요"
      }
    */
    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }
      const userId = req.user.id;
      const { points } = req.body;
      console.log(points);
      const updatedPoints = await PointsService.addUserPoints(userId, points);
      res.status(200).json({
        userId,
        updated_point: updatedPoints,
        message: "포인트 추가 성공",
      });
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
      }

      // 6️⃣ 예기치 않은 서버 오류 처리
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  },
  buyProduct: async (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Points']
      #swagger.summary = '상품 구매'
      #swagger.description = '현재 로그인한 사용자가 포인트를 사용하여 상품을 구매합니다.'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties:{
                productId: {type: "number", example: "1"}
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: "상품 구매 성공",
        content: {
          "application/json": {
            schema: {
            type: "object",
              properties:{  
                product_id: {type:"number", example: "1"},
                updated_point: {type:"number", example: "200"},
                message:{ type: "string", example: "상품 구매 성공"}
                }
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: "잘못된 요청 (상품 ID 누락)"
      }
      #swagger.responses[401] = {
        description: "사용자 인증 필요"
      }
      #swagger.responses[403] = {
        description: "포인트 부족"
      }
      #swagger.responses[404] = {
        description: "상품이 존재하지 않음"
      }
    */
    try {
      if (!req.user) {
        res.status(401).json({ message: "사용자 인증이 필요합니다." });
        return;
      }

      const userId = req.user.id;
      const { productId } = req.body;
      console.log(userId);

      if (!productId) {
        res.status(400).json({ message: "상품 ID가 필요합니다." });
        return;
      }

      const usedPoint = await PointsService.buyProduct(userId, productId);
      res.status(200).json({
        message: "상품 구매 성공",
        product_id: productId,
        updated_point: usedPoint,
      });
    } catch (error: any) {
      console.error("상품 구매 중 오류:", error);

      if (error.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "서버 오류가 발생했습니다." });
      return;
    }
  },
};
// export const getUserPoint = async (
//   req: Request,
//   res: Response<GetUserPointResponse>
// ) => {
//   const userId = parseInt(req.params.userId, 10);

//   try {
//     const points = await getUserPointService(userId);
//     res.json({
//       userId,
//       points,
//       message: "포인트 조회 성공",
//     });
//   } catch (error) {
//     res.status(500).json({
//       userId,
//       points: 0,
//       message: "Internal server error",
//     });
//   }
// };

// export const addUserPoint = async (
//   req: Request<{ userId: string }, {}, AddUserPointRequest>,
//   res: Response<AddUserPointResponse>
// ) => {
//   const userId = parseInt(req.params.userId, 10);
//   const { missionId, points, title, context } = req.body;

//   try {
//     const totalPoints = await addUserPointService(userId, points);
//     res.json({
//       userId,
//       points,
//       totalPoints,
//       missionId,
//       message: "포인트가 성공적으로 적립되었습니다.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       userId,
//       points: 0,
//       totalPoints: 0,
//       missionId,
//       message: "Internal server error",
//     });
//   }
// };

// export const useUserPoint = async (
//   req: Request<{ userId: string }, {}, UseUserPointRequest>,
//   res: Response<UseUserPointResponse>
// ) => {
//   const userId = parseInt(req.params.userId, 10);
//   const { points, title, context } = req.body;
//   try {
//     const totalPoints = await useUserPointService(userId, points);
//     if (totalPoints < 0) {
//       return res.status(400).json({
//         userId,
//         points,
//         totalPoints,
//         message: "포인트가 부족합니다.",
//       });
//     }
//     res.json({
//       userId,
//       points,
//       totalPoints,
//       message: "포인트가 성공적으로 사용 되었습니다.",
//     });
//   } catch (error) {
//     if (error instanceof Error && error.message === "Insufficient points") {
//       return res.status(400).json({
//         userId,
//         points,
//         totalPoints: 0,
//         message: "포인트가 부족합니다.",
//       });
//     }
//     res.status(500).json({
//       userId,
//       points: 0,
//       totalPoints: 0,
//       message: "Internal server error",
//     });
//   }
// };
