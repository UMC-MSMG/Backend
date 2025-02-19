//upload.routes.ts

import { Router } from "express";
import { uploadProfileImage } from "../controllers/upload.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

/**
 * 프로필 이미지 업로드 API
 * POST /api/settings/upload-profile-image
 */
router.post(
    "/upload-profile-image",
    verifyToken,
    /*
    #swagger.tags = ['Settings']
    #swagger.summary = "프로필 이미지 업로드"
    #swagger.description = "사용자가 프로필 이미지를 업로드하면 AWS S3에 저장하고 해당 이미지 URL을 반환합니다."
    #swagger.security = [{ "bearerAuth": [] }] 
    #swagger.consumes = ["multipart/form-data"]
    #swagger.produces = ["application/json"]
  
    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              image: {
                type: "string",
                format: "binary",
                description: "업로드할 이미지 파일 (JPEG, PNG, WEBP 지원)"
              }
            }
          }
        }
      }
    }
  
    #swagger.responses[200] = {
      description: "이미지 업로드 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              imageUrl: {
                type: "string",
                example: "https://your-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile_images/example.png"
              }
            }
          }
        }
      }
    }
  
    #swagger.responses[400] = {
      description: "이미지 파일이 제공되지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "이미지를 선택하세요."
              },
              statusCode: {
                type: "integer",
                example: 400
              }
            }
          }
        }
      }
    }
  
    #swagger.responses[500] = {
      description: "서버 오류 (S3 업로드 실패)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "파일 업로드 실패"
              },
              statusCode: {
                type: "integer",
                example: 500
              }
            }
          }
        }
      }
    }
    */
    uploadProfileImage
  );
  
  export default router;