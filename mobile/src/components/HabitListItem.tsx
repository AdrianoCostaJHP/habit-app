import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { FlipOutXUp, RotateInUpLeft, RotateInUpRight, ZoomIn, ZoomOut } from "react-native-reanimated";

type CheckBoxProps = {
  checked?: boolean;
  label: string;
} & TouchableOpacityProps;

export function HabitListItem({ checked = false, label, ...props }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center gap-3"
      {...props}
    >
      {checked ? (
        <Animated.View 
          className="w-8 h-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="w-8 h-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="font-semibold text-white text-base">{label}</Text>
    </TouchableOpacity>
  );
}
