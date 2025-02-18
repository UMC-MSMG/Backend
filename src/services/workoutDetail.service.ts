import { WorkoutDetailRepository } from "../repositories/workoutDetail.repository";
import { WorkoutDetail } from "../types/workout.types";

export class WorkoutDetailService {
  static async getWorkoutDetail(workoutId: number): Promise<WorkoutDetail[]> {
    const workoutDetails = await WorkoutDetailRepository.findWorkoutDetailsByWorkoutId(workoutId);

    // 그대로 반환 (videoUrl 대신 기존의 link 사용)
    return workoutDetails.map((detail) => ({
      id: detail.id,
      step: detail.step,
      description: detail.description,
      link: detail.link ?? undefined, // AWS S3 링크 그대로 전달
    }));
  }
}
