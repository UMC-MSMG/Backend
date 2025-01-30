// 걸음수 조회 응답 타입
export type GetUserStepsResponse = 
{ 
    userId: number; 
    steps: number; 
    message: string 
} 
| ErrorResponse;

 // 걸음수 추가 요청 타입
  export interface AddUserStepsRequest {
    steps: number;
    date: string;
  }
  
  // 걸음수 추가 응답 타입
  export type AddUserStepsResponse = 
  | {
    userId: number;
    steps: number;
    totalSteps: number;
    message: string;
  }
| ErrorResponse;

  export type ErrorResponse = {
    error: string;
    statusCode: number;
  };