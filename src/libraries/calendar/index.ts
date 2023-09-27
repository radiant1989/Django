import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
const getNumberOfDaysInMonth = (year: string, month: string) => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

export const createDaysForCurrentMonth = (year: string, month: string) => {
  return [...Array(getNumberOfDaysInMonth(year, month))].map(
    (_, index: number) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    }
  );
};

const getWeekday = (date: string) => {
  return dayjs(date).weekday();
};
export const createDaysForPreviousMonth = (year: string, month: string) => {
  const currentMonthDays = createDaysForCurrentMonth(year, month);
  const firstDayOfMonthWeekday = getWeekday(currentMonthDays[0].date);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfMonthWeekday
    ? firstDayOfMonthWeekday - 1
    : 6;
  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();
  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
    (_, index: number) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false,
      };
    }
  );
};

export const createDaysForNextMonth = (year: string, month: string) => {
  const currentMonthDays = createDaysForCurrentMonth(year, month);

  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;
  return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
    };
  });
};
