import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type HabitsListProps = {
  date: Date;
  handleCompletedHabit: (completedHabits: number) => void;
};

type HabitsInfo = {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
};

export function HabitsList({ date, handleCompletedHabit }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToogleHabit(habitId: string) {
    const isCompleted = habitsInfo!.completedHabits?.includes(habitId);

    try {
      api.patch(`/habits/${habitId}/toggle`);

      let completedHabits = [];

      if (isCompleted) {
        completedHabits = habitsInfo!.completedHabits.filter(
          (habit) => habit !== habitId
        );
      } else {
        completedHabits = [...habitsInfo!.completedHabits, habitId];
      }

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      });

      handleCompletedHabit(completedHabits?.length);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits?.map((habit) => {
        const checked = habitsInfo?.completedHabits?.includes(habit?.id);
        return (
          <Checkbox.Root
            key={habit?.id}
            checked={checked}
            onCheckedChange={() => handleToogleHabit(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-700  group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 ">
              {habit?.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
