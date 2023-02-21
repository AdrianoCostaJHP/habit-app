import { useReducer, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { BackButton } from "../../components/BackButton";
import { HabitListItem } from "../../components/HabitListItem";

import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function CreateHabit() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDay: number) {
    setWeekDays((prev) => {
      if (!prev.includes(weekDay)) {
        return [...prev, weekDay];
      }
      return prev.filter((day) => day !== weekDay);
    });
  }

  async function onSave() {
    try {
      if (!title.trim()) {
        return Alert.alert("Novo hábito", "Informe o nome do hábito!");
      }
      if (!weekDays.length) {
        return Alert.alert("Novo hábito", "Escolha a recorrência!");
      }

      await api.post("/habits", { title, weekDays });
      Alert.alert("Novo hábito", "Hábito criado com sucesso!");

      setTitle("");
      setWeekDays([]);
    } catch (error) {
      Alert.alert("Ops", "Não foi possivel criar o novo hábito!");
    }
  }

  function isChecked(weekDay: number) {
    return weekDays.includes(weekDay);
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base ">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercicios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="my-6 text-white font-semibold text-base ">
          Qual a recorrencia?
        </Text>

        {availableWeekDays?.map((weekDay, index) => {
          const isCheck = isChecked(index);
          return (
            <HabitListItem
              key={weekDay}
              checked={isCheck}
              label={weekDay}
              onPress={() => handleToggleWeekDay(index)}
            />
          );
        })}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={onSave}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
