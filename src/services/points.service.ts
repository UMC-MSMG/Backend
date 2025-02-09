import {
  getUserPointRepository,
  addUserPointsRepository,
  useUserPointsRepository,
} from "../repositories/points.repository";

export const getUserPointService = async (userId: number): Promise<number> => {
  const user = await getUserPointRepository(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.points;
};

export const addUserPointService = async (userId: number, points: number) => {
  const totalPoints = await addUserPointsRepository(userId, points);
  return totalPoints;
};

export const useUserPointService = async (userId: number, points: number) => {
  const user = await getUserPointRepository(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.points < points) {
    throw new Error("Insufficient points");
  }
  const totalPoints = await useUserPointsRepository(userId, points);
  return totalPoints;
};
