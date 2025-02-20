import { WorkoutRecordRepository } from "../repositories/workoutRecord.repository";

const WORKOUT_LEVEL_MAPPING: Record<string, number[]> = {
  HIGH: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39],
  NORMAL: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38],
  LOW: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
};

export class WorkoutRecordService {
  private workoutRecordRepository: WorkoutRecordRepository;

  constructor() {
    this.workoutRecordRepository = new WorkoutRecordRepository();
  }

  async generateThreeDayWorkout(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 3);

    // 사용자 workoutLevel 가져오기
    const user =
      await this.workoutRecordRepository.findUserWorkoutLevel(userId);
    if (!user?.workoutLevel) {
      throw new Error("User workout level not found");
    }

    const workoutIds = WORKOUT_LEVEL_MAPPING[user.workoutLevel];

    // 기존 운동 스케줄 확인
    const existingRecords =
      await this.workoutRecordRepository.findExistingRecords(
        userId,
        today,
        endDate
      );
    const existingDates = new Map<string, Set<number>>();

    existingRecords.forEach((record) => {
      const dateStr = record.scheduledDate.toISOString().split("T")[0];
      if (!existingDates.has(dateStr)) {
        existingDates.set(dateStr, new Set());
      }
      existingDates.get(dateStr)!.add(record.workoutId);
    });

    // 생성할 새로운 데이터 리스트
    const newRecords = [];
    for (let i = 0; i < 3; i++) {
      const workoutDate = new Date(today);
      workoutDate.setDate(today.getDate() + i);
      const formattedDate = workoutDate.toISOString().split("T")[0];

      const existingWorkoutIds = existingDates.get(formattedDate) ?? new Set();

      // workoutIds 전체가 하루에 포함되도록 보장
      for (const workoutId of workoutIds) {
        if (!existingWorkoutIds.has(workoutId)) {
          newRecords.push({
            scheduledDate: new Date(workoutDate),
            userId,
            workoutId,
          });
        }
      }
    }
    console.log(newRecords);

    if (newRecords.length > 0) {
      await this.workoutRecordRepository.createWorkoutRecords(newRecords);
    }

    return { message: "Workout schedule updated", created: newRecords.length };
  }
}
