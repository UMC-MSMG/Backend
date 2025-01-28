// 걸음수 조회 응답 타입
export interface GetUserStepsResponse {
    userId: number;
    steps: number;
    message: string;
  }
  
  // 걸음수 추가 요청 타입
  export interface AddUserStepsRequest {
    steps: number;
  }
  
  // 걸음수 추가 응답 타입
  export interface AddUserStepsResponse {
    userId: number;
    steps: number;
    totalSteps: number;
    message: string;
  }
  