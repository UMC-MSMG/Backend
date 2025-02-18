//settings.routes.ts

import { Router } from "express";
import { updateFontSize, updateUserProfile, updateMedications, updateWorkoutLevel } from "../controllers/settings.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

/**
 * 글씨 크기 수정
 * PUT /api/settings/font-size
 */
router.put(
  "/font-size",
  verifyToken, 
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '글씨 크기 수정'
  #swagger.description = '사용자의 글씨 크기 설정을 수정합니다.'
  #swagger.security = [{ "bearerAuth": [] }] 
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
  verifyToken, 
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '사용자 정보 수정'
  #swagger.description = '사용자의 프로필 정보를 수정합니다.'
  #swagger.security = [{ "bearerAuth": [] }]
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

/**
 * 복용 약물 정보 수정
 * PATCH /api/settings/medications
 */
router.patch(
  "/medications",
  verifyToken,
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '복용 약물 정보 수정'
  #swagger.description = '사용자가 복용 중인 약물을 추가, 수정, 삭제할 수 있습니다.'
  #swagger.security = [{ "bearerAuth": [] }] 
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            medications: {
              type: "array",
              description: "사용자가 등록할 약물 목록",
              items: {
                type: "object",
                properties: {
                  medName: { type: "string", example: "타이레놀", description: "약물 이름" },
                  description: { type: "string", example: "진통제", description: "약물 설명", nullable: true },
                  medicationDays: { 
                    type: "array",
                    items: { type: "string", enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] },
                    example: ["MON", "WED", "FRI"],
                    description: "복용 요일"
                  },
                  medicationTimes: { 
                    type: "array",
                    items: { type: "string", pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", example: "08:30" },
                    example: ["08:30", "20:00"],
                    description: "복용 시간 (HH:MM)"
                  }
                }
              }
            }
          },
          required: ["medications"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '약물 정보 수정 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "약물 정보가 성공적으로 업데이트되었습니다." }
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
  updateMedications
);

/**
* 운동 난이도 수정
* PATCH /api/settings/workout-level
*/
router.patch(
  "/workout-level",
  verifyToken, 
  /*
  #swagger.tags = ['Settings']
  #swagger.summary = '운동 난이도 수정'
  #swagger.description = '사용자가 자신의 운동 난이도를 설정합니다. (상, 중, 하)'
  #swagger.security = [{ "bearerAuth": [] }] 
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            workoutLevel: { 
              type: "string", 
              enum: ["LOW", "MEDIUM", "HIGH"], 
              example: "MEDIUM",
              description: "운동 난이도 (LOW: 하, MEDIUM: 중, HIGH: 상)" 
            }
          },
          required: ["workoutLevel"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "운동 난이도 수정 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "운동 난이도가 성공적으로 업데이트되었습니다." }
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
  updateWorkoutLevel
);

export default router;
