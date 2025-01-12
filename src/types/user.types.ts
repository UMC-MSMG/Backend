import { Medication, MedicationFrequency } from "./medication.types";
// 회원가입 요청 타입
export interface SignupRequest {
  name: string;
  phone_number: string;
  birth_date: string; // YYYY-MM-DD
  height: number;
  weight: number;
  taking_medication: boolean;
  medication_frequency: {
    days_per_week: number;
  };
  medications: {
    name: string;
    dosage: string;
    time_of_day: string;
  }[];
  guardian: string;
  health_status: string;
  agree_to_terms: boolean;
}

export interface UserInfoResponse {
  id: number; // 사용자 ID
  name: string; // 사용자 이름
  phone_number: string; // 전화번호
  birth_date: string; // 생년월일 (YYYY-MM-DD)
  height: number; // 키
  weight: number; // 몸무게
  workout_frequency: number; // 운동 빈도 (주간)
  consent_privacy_policy: boolean; // 개인정보 동의 여부
  consent_terms_service: boolean; // 서비스 이용 약관 동의 여부
  consent_date: string; // 동의 날짜 및 시간 (YYYY-MM-DD HH:MM:SS)
  emergency_contact_phone: string; // 긴급 연락처
  created_at: string; // 생성 시간 (YYYY-MM-DD HH:MM:SS)
  updated_at: string; // 수정 시간 (YYYY-MM-DD HH:MM:SS)
}

export interface UpdateUserDTO {
  name?: string;
  phone_number?: string;
  birth_date?: string;
  height?: number;
  weight?: number;
  taking_medication?: boolean;
  medication_frequency?: MedicationFrequency;
  medications?: Medication[];
  guardian?: string;
  health_status?: string;
}
