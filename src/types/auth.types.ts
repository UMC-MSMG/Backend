export interface PhoneVerificationRequest {
  phone_number: string;
}

// 인증 코드 저장 (메모리 사용)
export interface VerificationData {
  code: string;
  expiresAt: number; // 만료 시간 (timestamp)
  timeoutId: NodeJS.Timeout;
}

export interface PhoneVerificationCodeRequest {
  phone_number: string;
  verification_code: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}

export interface VerificationResponse {
  message: string;
}
