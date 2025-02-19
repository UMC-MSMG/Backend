import { prisma } from "../db.config";

export const HistoryRepository = {
  //   /**
  //    * 이번 달, 저번 달 번 돈, 번 돈 차이, 연속 운동 일수, 이번 주 운동 여부 가져오기
  //    * @param userId 사용자 ID
  //    * @param firstDayOfThisMonth 이번 달 시작일
  //    * @param firstDayOfLastMonth 저번 달 시작일
  //    * @param lastDayOfLastMonth 저번 달 마지막 날
  //    * @param startOfWeek 이번 주 시작일
  //    * @param endOfWeek 이번 주 마지막 날
  //    */

  getHistorySummary: async (
    userId: number,
    firstDayOfThisMonth: Date,
    firstDayOfLastMonth: Date,
    lastDayOfLastMonth: Date,
    startOfWeek: Date
  ) => {
    // 1️. 이번 달 번 돈
    const thisMonthEarnings = await prisma.missionHistory.findMany({
      where: { userId: userId, completedDate: { gte: firstDayOfThisMonth } },
      select: { Mission: { select: { point: true } } },
    });

    //1-1. 이번 달 번 돈 합계
    const thisMonthEarningsSum = thisMonthEarnings.reduce(
      (acc, cur) => acc + (cur.Mission.point || 0),
      0
    );

    // 2. 저번 달 번 돈
    const lastMonthEarnings = await prisma.missionHistory.findMany({
      where: {
        userId: userId,
        completedDate: { gte: firstDayOfLastMonth, lte: lastDayOfLastMonth },
      },
      select: { Mission: { select: { point: true } } },
    });

    //2-1. 저번 달 번 돈 합계
    const lastMonthEarningsSum = lastMonthEarnings.reduce(
      (acc, cur) => acc + (cur.Mission.point || 0),
      0
    );

    // 3. 연속 운동 일수
    const records = await prisma.workoutRecord.findMany({
      where: { userId: userId, isComplete: true },
      select: { completeDate: true, workoutId: true },
      orderBy: { completeDate: "desc" },
    });
    console.log(records);

    function formatWorkoutRecords(
      records: { completeDate: Date; workoutId: number }[]
    ) {
      return records.map((record) => ({
        completeDate: new Date(record.completeDate).toISOString().split("T")[0], // "YYYY-MM-DD"로 변환
        workoutId: record.workoutId,
      }));
    }

    //@ts-ignore
    const formattedRecords = formatWorkoutRecords(records);
    console.log(formattedRecords);

    const today = new Date().toISOString().split("T")[0];

    let sequenceStart: Date | null;
    let count = 0;
    let sequenceWorkout: {
      workoutId: number;
      count: number;
      workoutName?: string;
    }[] = [];

    function updateSequenceWorkout(
      sequenceWorkout: { workoutId: number; count: number }[],
      newWorkoutId: number
    ): { workoutId: number; count: number }[] {
      const found = sequenceWorkout.some(
        (data) => data.workoutId === newWorkoutId
      );
      console.log(found);

      const updatedSequenceWorkout = found
        ? sequenceWorkout.map((data) =>
            data.workoutId === newWorkoutId
              ? { ...data, count: data.count + 1 }
              : data
          )
        : [...sequenceWorkout, { workoutId: newWorkoutId, count: 1 }];

      console.log("함수 안", updatedSequenceWorkout);
      return updatedSequenceWorkout; // ✅ 변경된 배열을 반환
    }

    if (records.length == 0) {
      console.log(records.length);
      sequenceStart = null;
    } else if (today != formattedRecords[0].completeDate) {
      console.log(
        new Date(formattedRecords[0].completeDate),
        today,
        "오늘이 아님"
      );
      sequenceStart = null;
    } else {
      let tempDate = new Date(formattedRecords[0].completeDate);
      sequenceWorkout.push({
        workoutId: formattedRecords[0].workoutId,
        count: 1,
      });

      for (let i = 1; i < formattedRecords.length; i++) {
        count++;
        const currentDate = new Date(formattedRecords[i].completeDate);
        console.log("날짜", tempDate, currentDate);
        const diff =
          (tempDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff == 1) {
          sequenceWorkout = updateSequenceWorkout(
            sequenceWorkout,
            formattedRecords[i].workoutId
          );
          tempDate = currentDate;
          console.log(tempDate, count, sequenceWorkout);
        } else {
          break;
        }
      }
      console.log(tempDate, count);
      sequenceStart = tempDate;

      //운동 리스트에 이름 추가하기
      const workoutIds = sequenceWorkout.map((data) => data.workoutId);

      // Prisma를 사용해 workout 테이블에서 해당 workoutId들의 workoutName 조회
      const workouts = await prisma.workout.findMany({
        where: {
          id: { in: workoutIds },
        },
        select: {
          id: true,
          workoutName: true,
        },
      });
      // 3️⃣ workoutId와 workoutName을 매핑
      const workoutMap = new Map(workouts.map((w) => [w.id, w.workoutName]));

      // 4️⃣ 기존 sequenceWorkout 배열에 workoutName 추가
      sequenceWorkout = sequenceWorkout.map((data) => ({
        ...data,
        workoutName: workoutMap.get(data.workoutId) || "Unknown Workout", // 만약 조회되지 않으면 기본값 설정
      }));
      console.log("최종 운동 리스트", sequenceWorkout);
    }

    // 4️⃣ **이번 주 운동 여부**
    const weeklyExercise = await prisma.workoutRecord.findMany({
      where: {
        userId,
        completeDate: {
          gte: startOfWeek,
        },
      },
      orderBy: [{ completeDate: "asc" }],
    });

    // 주간 운동 여부 초기화 (null: 미래 날짜, false: 운동 안 함, true: 운동함)
    const weeklyExerciseStatus: Record<string, boolean> = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };

    // 운동한 날 업데이트
    weeklyExercise.forEach((record) => {
      if (record.completeDate) {
        const day = record.completeDate
          .toLocaleString("en-US", { weekday: "long" })
          .toLowerCase();
        weeklyExerciseStatus[day] = true;
      }
    });

    // **5️⃣ 운동 레벨**
    const workoutLevel = await prisma.user.findFirst({
      where: { id: userId },
      select: { workoutLevel: true },
    });
    console.log(workoutLevel);

    return {
      this_month_earnings: thisMonthEarningsSum || 0,
      last_month_earnings: lastMonthEarningsSum,
      sequence_days: count,
      sequence_start: sequenceStart,
      sequence_workouts: sequenceWorkout,
      sequence_end: new Date(),
      weekly_workout: weeklyExerciseStatus,
      workout_level: workoutLevel?.workoutLevel,
    };
  },

  //////////////////////////////// 달력 데이터 반환 레포지토리 함수
  getCalender: async (
    userId: number,
    firstDayOfMonth: Date,
    lastDayOfMonth: Date
  ) => {
    //해당 달 운동 일수

    const workoutDaysCount: any = await prisma.$queryRaw`
    SELECT COUNT(*) as count
    FROM (
        SELECT COUNT(*)
        FROM workout_record
        WHERE is_complete = 1 
          AND complete_date >= ${firstDayOfMonth}
          AND complete_date <= ${lastDayOfMonth}
          AND user_id = ${userId}
        GROUP BY complete_date
    ) AS a;
  `;
    const workoutDaysNum = Number(workoutDaysCount[0].count);

    console.log("카운트: ", Number(workoutDaysCount[0].count));

    // 해당 달 번 돈 리스트
    const thisMonthEarnings = await prisma.missionHistory.findMany({
      where: {
        userId: userId,
        completedDate: { gte: firstDayOfMonth, lte: lastDayOfMonth },
      },
      select: { Mission: { select: { point: true } } },
    });

    // 해당 달 번 돈 합계
    const thisMonthEarningsSum: number = thisMonthEarnings.reduce(
      (acc, cur) => acc + (cur.Mission.point || 0),
      0
    );

    return {
      workoutDaysNum,
      thisMonthEarningsSum,
    };
  },
};
