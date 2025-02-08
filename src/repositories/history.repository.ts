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
    // const continueCount = await prisma.$queryRaw`
    //     -- SELECT *
    //     -- FROM
    //     -- (
    //     --     SELECT
    //     --         @d:=complete_date
    //     --         @n:=CONVERT(IF(DATEDIFF(complete_date, @d) = 1, @name + 1, 1), INT) AS count,
    //     --     FROM workout_record
    //     --     WHERE user_id = ${userId} AND is_completed = 1
    //     --     ORDER BY complete_date DESC
    //     -- ) AS t
    //     -- WHERE user_id = ${userId}
    // `;

    // 4️⃣ **이번 주 운동 여부**
    const weeklyExercise = await prisma.workoutRecord.findMany({
      where: {
        userId,
        completeDate: {
          gte: startOfWeek,
        },
      },
    });

    // 주간 운동 여부 초기화 (null: 미래 날짜, false: 운동 안 함, true: 운동함)
    const weeklyExerciseStatus: Record<string, boolean | null> = {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
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

    return {
      this_month_earnings: thisMonthEarningsSum || 0,
      last_month_earnings: lastMonthEarningsSum,
      earnings_difference: thisMonthEarningsSum - lastMonthEarningsSum,
      continue_days: 3,
      weekly_exercise: weeklyExerciseStatus,
    };
  },

  // 달력 데이터 반환 레포지토리 함수
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
