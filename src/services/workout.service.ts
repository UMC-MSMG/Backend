import { WorkoutRepository } from "../repositories/workout.repository";
import { WorkoutCompleteDto } from "../dtos/workout.dto";
import { PointsRepository } from "../repositories/points.repository";

export const workoutService = {
  completeWorkout: async (data: WorkoutCompleteDto) => {
    try {
      await Promise.all(
        data.workoutList.map((id) =>
          WorkoutRepository.addWorkoutRecord(data.userId, id)
        )
      );
      const totalPoint = await PointsRepository.addUserPoint(data.userId, 10);
      return totalPoint;
    } catch (error) {
      throw { statusCode: 500, message: "서버 오류가 발생했습니다." };
    }
  },
};
