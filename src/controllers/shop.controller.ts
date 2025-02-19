//shop.controller.ts

import { Request, Response } from "express";
import { ShopService } from "../services/shop.service";

/**
 * 사용자가 구매한 기프티콘 조회
 */
export const getUserGifticons = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Shops']
    #swagger.summary = '사용자의 기프티콘 목록 조회'
    #swagger.description = '현재 로그인한 사용자가 구매한 기프티콘 목록을 조회합니다.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: "사용자 기프티콘 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number", example: 1 },
              gifticons: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 1 },
                    name: { type: "string", example: "레쓰비" },
                    price: { type: "number", example: 800 },
                    image: { type: "string", example: "image_url" },
                  }
                }
              },
              message: { type: "string", example: "기프티콘 조회 성공" }
            }
          }
        }
      }
    }
    #swagger.responses[401] = { description: "사용자 인증 필요" }
    #swagger.responses[500] = { description: "서버 오류" }
  */
  try {
    if (!req.user) {
      res.status(401).json({ message: "사용자 인증이 필요합니다." });
      return;
    }
    const userId = req.user.id;
    const gifticons = await ShopService.getUserGifticons(userId);
    res.status(200).json({
      userId,
      gifticons,
      message: "기프티콘 조회 성공",
    });
  } catch (error) {
    console.error("기프티콘 조회 중 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

/**
 * 전체 기프티콘 조회
 */
export const getAllGifticons = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Shops']
    #swagger.summary = '구매 가능한 전체 기프티콘 목록 조회'
    #swagger.description = '사용자가 구매할 수 있는 전체 기프티콘 목록을 조회합니다.'
    #swagger.responses[200] = {
      description: "전체 기프티콘 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 1 },
                    name: { type: "string", example: "레쓰비" },
                    price: { type: "number", example: 800 },
                    image: { type: "string", example: "image_url" },
                  }
                }
              },
              message: { type: "string", example: "전체 기프티콘 조회 성공" }
            }
          }
        }
      }
    }
    #swagger.responses[500] = { description: "서버 오류" }
  */
  try {
    const products = await ShopService.getAllGifticons();
    res.status(200).json({
      products,
      message: "전체 기프티콘 조회 성공",
    });
  } catch (error) {
    console.error("전체 기프티콘 조회 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
