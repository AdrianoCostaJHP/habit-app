import { useNavigation, useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../../components/BackButton";
import { HabitEmpty } from "../../components/HabitEmpty";
import { HabitListItem } from "../../components/HabitListItem";
import Loading from "../../components/Loading";
import { ProgressBar } from "../../components/ProgressBar";
import { api } from "../../lib/axios";
import { generateProgressPercentage } from "../../utils/generate-progress-percentage";

type Params = {
  date: string;
};

type HabitsInfoProps = {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
};

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await api.get("/day", {
        params: {
          date: dayjs(date).endOf("day")
        },
      });
      setHabitsInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possivel buscar os hábitos!");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits?.includes(habitId)) {
        setCompletedHabits((prev) => prev.filter((id) => id !== habitId));
      } else {
        setCompletedHabits((prev) => [...prev, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar o status do hábito.")
    }
  };

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayOfMonth = parsedDate.format("DD/MM");

  const percentage = habitsInfo?.possibleHabits?.length
    ? generateProgressPercentage(
        habitsInfo?.possibleHabits?.length,
        completedHabits?.length
      )
    : 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl ">
          {dayOfMonth}
        </Text>
        <ProgressBar progress={percentage} />
        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast,
          })}
        >
          {habitsInfo?.possibleHabits &&
          habitsInfo?.possibleHabits?.length > 0 ? (
            habitsInfo?.possibleHabits?.map((habit) => {
              const isChecked = completedHabits?.includes(habit?.id);
              return (
                <HabitListItem
                  key={habit?.id}
                  label={habit?.title}
                  checked={isChecked}
                  disabled={isDateInPast}
                  onPress={() => handleToggleHabit(habit?.id)}
                />
              );
            })
          ) : (
            <>{!isDateInPast && <HabitEmpty />}</>
          )}
        </View>
        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar os hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
