//settings.types.ts

export type ErrorResponse = {
    error: string;
    statusCode: number;
  };
  
  // 글씨 크기 관련 타입
  export type UpdateFontSizeRequest = {
    fontSize: number; // 1(기본), 2(크게), 3(아주 크게)
  };
  
  export type UpdateFontSizeResponse =
    | {
        message: string;
      }
    | ErrorResponse;
  
  
  // 사용자 프로필 관련 타입
  export type UpdateUserProfileRequest = {
    profileImage?: string;
    name?: string;
    gender?: "MALE" | "FEMALE";
    height?: number;
    weight?: number;
    phoneNumber?: string;
  };
  
  export type UpdateUserProfileResponse =
    | {
        message: string;
      }
    | ErrorResponse;
  
  export type GetUserProfileResponse =
    | {
        userId: number;
        profileImage?: string;
        name: string;
        gender?: "MALE" | "FEMALE";
        height?: number;
        weight?: number;
        phoneNumber?: string;
      }
    | ErrorResponse;
  
  // 복용 약물 관련 타입
  export type UpdateMedicationRequest = {
  medications: {
    medName: string;
    description?: string;
    medicationDays: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
    medicationTimes: string[]; // ["08:00", "20:00"]
  }[];
};

export type UpdateMedicationResponse =
  | {
      message: string;
    }
  | ErrorResponse;

export type UpdateWorkoutLevelRequest = {
  workoutLevel: "LOW" | "MEDIUM" | "HIGH";
};

export type UpdateWorkoutLevelResponse =
  | {
      message: string;
    }
  | ErrorResponse;
