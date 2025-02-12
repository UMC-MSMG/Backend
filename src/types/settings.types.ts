export type ErrorResponse = {
    error: string;
    statusCode: number;
  };
  
  // 글씨 크기 관련 타입
  export type UpdateFontSizeRequest = {
    userId: number;
    fontSize: number; // 1(기본), 2(크게), 3(아주 크게)
  };
  
  export type UpdateFontSizeResponse =
    | {
        message: string;
      }
    | ErrorResponse;
  
  
  // 사용자 프로필 관련 타입
  export type UpdateUserProfileRequest = {
    userId: number;
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
  
  