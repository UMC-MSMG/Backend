import * as pointsRepository from "../repositories/points.repository";

export const getUserPoints = async (userId: number) => {
  return await pointsRepository.getUserPoints(userId);
};

export const addUserPoints = async (
  userId: number,
  points: number,
  missionId: number,
  title: string,
  context: string
) => {
  const totalPoints = await pointsRepository.addUserPoints(userId, points);
  return {
    userId,
    points,
    totalPoints,
    missionId,
    message: "포인트가 성공적으로 적립되었습니다.",
  };
};

export const useUserPoints = async (
  userId: number,
  points: number,
  title: string,
  context: string
) => {
  const totalPoints = await pointsRepository.useUserPoints(userId, points);
  return {
    userId,
    points,
    totalPoints,
    message: "포인트가 성공적으로 사용 되었습니다.",
  };
};
