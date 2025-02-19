// steps.types.ts
// 걸음수 조회 응답 타입

export type ErrorResponse = {
  error: string;
  statusCode: number;
};

export type GetUserStepsResponse =
  | {
      userId: number;
      steps: number;
      message: string;
    }
  | ErrorResponse;

export interface AddUserStepsRequest {
  steps: number;
  date: string; // "YYYY-MM-DD" 형식의 날짜
}

export type AddUserStepsResponse =
  | {
      userId: number;
      totalSteps: number;
      message: string;
    }
  | ErrorResponse;
