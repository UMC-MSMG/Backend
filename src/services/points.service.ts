import { PointsRepository } from "../repositories/points.repository";

export const PointsService = {
  //포인트 조회 서비스 함수
  getUserPoints: async (userId: number) => {
    const user: number = await PointsRepository.getUserPoint(userId);
    if (!user && user != 0) {
      throw {
        message: "사용자의 포인트 정보를 찾을 수 없습니다.",
        statusCode: 404,
      };
    }
    return user;
  },
  //포인트 추가 서비스 함수
  addUserPoints: async (userId: number, points: number) => {
    try {
      if (points <= 0) {
        throw { statusCode: 400, message: "포인트 값은 0보다 커야 합니다." };
      }

      const totalPoints = await PointsRepository.addUserPoint(userId, points);

      return totalPoints;
    } catch (error) {
      console.error("포인트 추가 중 오류:", error);
      throw { statusCode: 500, message: "서버 오류가 발생했습니다." };
    }
  },
  //구매
  buyProduct: async (userId: number, productId: number) => {
    try {
      const userPoint = await PointsRepository.getUserPoint(userId);
      const productPrice: number =
        await PointsRepository.getProductPrice(productId);
      if (userPoint < productPrice) {
        throw {
          statusCode: 403,
        };
      }

      await PointsRepository.buyProduct(productId, userId);
      const usedPoints = await PointsRepository.getUserPoint(userId);
      if (userPoint - productPrice !== usedPoints) {
        throw { statusCode: 403, message: "포인트 차감 오류" };
      }
      return usedPoints;
    } catch (error: any) {
      if (error?.statusCode == 403) {
        throw {
          message: "포인트가 부족합니다.",
          statusCode: 403,
        };
      }
      throw {
        message: "구매 중 오류가 발생했습니다.",
        statusCode: 500,
      };
    }
  },
};
