import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBegginer } from "../utils/generate-dates-from-year-begginer";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBegginer();

const minimumSummaryDays = 18 * 7;
const amountOfDaysToFill = minimumSummaryDays - datesFromYearStart?.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export function Home() {
  const { navigate } = useNavigation();
  const [summaryData, setSummaryData] = useState<SummaryProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadSummaryData() {
    try {
      // setLoading(true);
      const response = await api.get("/summary");
      console.log(response?.data);
      setSummaryData(response?.data);
    } catch (e) {
      Alert.alert("Ops", "Não foi possivel carregar os hábitos diarios!");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadSummaryData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-1">
        <View className="flex-row mt-6 mb-2">
          {weekDays?.map((weekDay, index) => (
            <Text
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{
                width: DAY_SIZE,
              }}
            >
              {weekDay}
            </Text>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap">
            {datesFromYearStart?.map((date) => {
              const dayWithHabits = summaryData?.find((day) => {
                return dayjs(day?.date).isSame(date, "day");
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  amountHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  date={date}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                />
              );
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill })?.map((_, index) => (
                <View
                  key={`$${index}`}
                  className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40 "
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
