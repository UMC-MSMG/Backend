import { WorkoutRecordRepository } from "../repositories/workoutRecord.repository";

export class WorkoutRecordService {
  private workoutRecordRepository: WorkoutRecordRepository;

  constructor() {
    this.workoutRecordRepository = new WorkoutRecordRepository();
  }

  async generateWeeklyWorkout(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    // 기존 운동 스케줄 확인
    const existingRecords =
      await this.workoutRecordRepository.findExistingRecords(
        userId,
        today,
        endDate
      );
    const existingDates = new Set(
      existingRecords.map(
        (record) => record.scheduledDate.toISOString().split("T")[0]
      )
    );

    // 생성할 새로운 데이터 리스트
    const newRecords = [];
    for (let i = 0; i < 7; i++) {
      const workoutDate = new Date(today);
      workoutDate.setDate(today.getDate() + i);

      const formattedDate = workoutDate.toISOString().split("T")[0];
      if (!existingDates.has(formattedDate)) {
        for (let workoutId = 1; workoutId <= 8; workoutId++) {
          newRecords.push({
            scheduledDate: new Date(workoutDate),
            userId,
            workoutId,
          });
        }
      }
    }

    if (newRecords.length > 0) {
      await this.workoutRecordRepository.createWorkoutRecords(newRecords);
    }

    return { message: "Workout schedule updated", created: newRecords.length };
  }
}
