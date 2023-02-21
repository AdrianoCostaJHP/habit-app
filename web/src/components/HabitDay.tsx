import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useState } from "react";
import { HabitsList } from "./HabitsList";
import { ProgressBar } from "./ProgressBar";

type HabitDayProps = {
  amount?: number;
  defaultCompleted?: number;
  date: Date;
  classStyle?: string;
};

export function HabitDay({
  amount = 0,
  defaultCompleted = 0,
  date,
  classStyle,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const percentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  
  const dayAndMonth = dayjs(date).format("DD/MM")
  const weekDay = dayjs(date).format("dddd")

  const handleCompletedHabit = (completedHabits: number) => {
    setCompleted(completedHabits);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(`w-10 h-10 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700  focus:ring-offset-2 focus:ring-offset-background ${classStyle}`, {
          "bg-zinc-900 border-zinc-800":percentage === 0,
          "bg-violet-500 border-violet-400": percentage > 0 && percentage < 20,
          "bg-violet-600 border-violet-500":
            percentage >= 20 && percentage < 40,
          "bg-violet-700 border-violet-500":
            percentage >= 40 && percentage < 60,
          "bg-violet-800 border-violet-600":
            percentage >= 60 && percentage < 80,
          "bg-violet-900 border-violet-700": percentage >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          <span className="font-semibold text-zinc-400">{weekDay}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={percentage} />
          <HabitsList date={date} handleCompletedHabit={handleCompletedHabit}/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
