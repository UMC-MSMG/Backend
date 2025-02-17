//settings.routes.ts

import { Router } from "express";
import { updateFontSize, updateUserProfile } from "../controllers/settings.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verify } from "crypto";

const router = Router();

/**
 * 글씨 크기 수정
 * PUT /api/settings/font-size
 */
router.put(
  "/font-size",
  verifyToken, // JWT 인증 적용
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '글씨 크기 수정'
  #swagger.description = '사용자의 글씨 크기 설정을 수정합니다.'
  #swagger.security = [{ "bearerAuth": [] }] // JWT 인증 추가
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            fontSize: { type: "integer", description: "수정할 글씨 크기 (1: 기본, 2: 크게, 3: 아주 크게)" }
          },
          required: ["fontSize"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '글씨 크기 수정 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "글씨 크기가 성공적으로 변경되었습니다." }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: '잘못된 요청',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "유효하지 않은 요청입니다." },
            statusCode: { type: "integer", example: 400 }
          }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: '인증 실패',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "인증 토큰이 필요합니다." },
            statusCode: { type: "integer", example: 401 }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "서버 오류가 발생했습니다." },
            statusCode: { type: "integer", example: 500 }
          }
        }
      }
    }
  }
  */
  updateFontSize
);

/**
 * 사용자 정보 수정
 * PUT /api/settings/profile
 */
router.put(
  "/profile",
  verifyToken, // JWT 인증 적용
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '사용자 정보 수정'
  #swagger.description = '사용자의 프로필 정보를 수정합니다.'
  #swagger.security = [{ "bearerAuth": [] }] // JWT 인증 추가
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            profileImage: { type: "string", description: "프로필 이미지 URL", nullable: true },
            name: { type: "string", description: "사용자 이름", nullable: true },
            gender: { type: "string", enum: ["MALE", "FEMALE"], description: "사용자 성별", nullable: true },
            height: { type: "number", description: "키 (cm)", nullable: true },
            weight: { type: "number", description: "몸무게 (kg)", nullable: true },
            phoneNumber: { type: "string", description: "전화번호", nullable: true }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "사용자 정보 수정 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "사용자 정보가 성공적으로 업데이트되었습니다." }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "잘못된 요청",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "유효하지 않은 요청입니다." },
            statusCode: { type: "integer", example: 400 }
          }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: "인증 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "인증 토큰이 필요합니다." },
            statusCode: { type: "integer", example: 401 }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: { type: "string", example: "서버 오류가 발생했습니다." },
            statusCode: { type: "integer", example: 500 }
          }
        }
      }
    }
  }
  */
  updateUserProfile
);

export default router;
