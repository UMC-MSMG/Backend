export interface PhoneVerificationRequest {
  phone_number: string;
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
