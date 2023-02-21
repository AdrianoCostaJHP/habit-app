import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBegginer } from "../utils/generate-dates-from-year-begginer";
import { Day } from "./Day";
import { HabitDay } from "./HabitDay";

const weekDays = ["d", "s", "t", "q", "q", "s", "s"];
const dates = generateDatesFromYearBegginer();

const minimunSummaryDaysToFill = 18 * 7;
const amountOfDaysToFill = minimunSummaryDaysToFill - dates?.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryProps[]>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays?.map((day, index) => (
          <Day key={`week-day-${day}-${index}`} label={day.toUpperCase()} />
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3 ">
        {summary?.length > 0 && dates?.map((date) => {
          const summaryDay = summary.find((day) => {
            return dayjs(date).isSame(day?.date, "day");
          });
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={summaryDay?.amount}
              defaultCompleted={summaryDay?.completed}
            />
          );
        })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill })?.map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-lg border-2 bg-zinc-900 border-zinc-800"
            />
          ))}
      </div>
    </div>
  );
}
