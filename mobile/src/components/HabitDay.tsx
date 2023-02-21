import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { clsx } from "clsx";
import dayjs from "dayjs";

type HabitDayProps = {
  amountHabits?: number;
  amountCompleted?: number;
  date: Date;
  onPress?: () => void;
} & TouchableOpacityProps;

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = 64 / 5;

export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function HabitDay({
  amountHabits = 0,
  amountCompleted = 0,
  date,
  ...props
}: HabitDayProps) {
  const percentage =
    amountCompleted > 0
      ? generateProgressPercentage(amountHabits, amountCompleted)
      : 0;
  
      const today  = dayjs().startOf("day").toDate();
      const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx("rounded-lg border-2 m-1", {
        "bg-zinc-900 border-zinc-800": percentage === 0,
        "bg-violet-500 border-violet-400": percentage > 0 && percentage < 20,
        "bg-violet-600 border-violet-500": percentage >= 20 && percentage < 40,
        "bg-violet-700 border-violet-500": percentage >= 40 && percentage < 60,
        "bg-violet-800 border-violet-600": percentage >= 60 && percentage < 80,
        "bg-violet-900 border-violet-700": percentage >= 80,
        "border-white border-3": isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...props}
    />
  );
}
