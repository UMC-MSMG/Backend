export interface GetUserPointResponse {
  userId: number;
  points: number;
  message: string;
}

export interface AddUserPointRequest {
  missionId: number;
  points: number;
  title: string;
  context: string;
}

export interface AddUserPointResponse {
  userId: number;
  points: number;
  totalPoints: number;
  missionId: number;
  message: string;
}

export interface UseUserPointRequest {
  points: number;
  title: string;
  context: string;
}

export interface UseUserPointResponse {
  userId: number;
  points: number;
  totalPoints: number;
  message: string;
}
