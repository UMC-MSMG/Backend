import { get } from "http";
import { HistoryRepository } from "../repositories/history.repository";

export const historyService = {
  getSummary: async (userId: number) => {
    // function dateFormat(date: Date) {
    //   let dateFormat2: Date =
    //     date.getFullYear() +
    //     "-" +
    //     (date.getMonth() + 1 < 9
    //       ? "0" + (date.getMonth() + 1)
    //       : date.getMonth() + 1) +
    //     "-" +
    //     (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
    //   return dateFormat2;
    // }
    const today = new Date();
    const firstDayOfThisMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const firstDayOfLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );
    const lastDayOfLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    );
    // 월요일 시작
    const startOfWeek = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - new Date().getDay() + 1
    );

    try {
      return await HistoryRepository.getHistorySummary(
        userId,
        firstDayOfThisMonth,
        firstDayOfLastMonth,
        lastDayOfLastMonth,
        startOfWeek
      );
    } catch (error) {
      console.error("요약 정보 조회 중 오류 발생:", error);
      throw new Error("요약 정보 조회 실패");
    }
  },
  getCalendar: async (userId: number, year: String, month: String) => {
    try {
      const numYear: number = +year;
      const numMonth: number = +month;
      console.log(numYear, numMonth);
      const firstDayOfMonth = new Date(numYear, numMonth - 1, 1);
      const lastDayOfMonth = new Date(numYear, numMonth, 0);
      console.log("날짜 : ", firstDayOfMonth, lastDayOfMonth);
      const data = await HistoryRepository.getCalender(
        userId,
        firstDayOfMonth,
        lastDayOfMonth
      );
      console.log(typeof data);
      console.log(data);
      return {
        month: `${year}-${month}`,
        monthly_workout_days: data.workoutDaysNum,
        monthly_earnings: data.thisMonthEarningsSum,
      };
    } catch (error) {
      console.error("요약 정보 조회 중 오류 발생:", error);
      throw new Error("요약 정보 조회 실패");
    }
  },
};
