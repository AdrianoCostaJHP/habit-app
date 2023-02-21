import { FormEvent, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function HabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || setWeekDays?.length === 0) {
      return;
    }
    try {
      await api.post("/habits", {
        title,
        weekDays,
      });

      toast.success("Hábito criado com sucesso!!");
      setTitle("");
      setWeekDays([]);
    } catch (e) {
      toast.error("houve um erro ao criar o hábito!!");
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((prev) => prev.filter((day) => day !== weekDay));
    } else {
      setWeekDays((prev) => [...prev, weekDay]);
    }
  }

  return (
    <form onSubmit={handleCreateHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700  focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrencia ?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays?.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays?.includes(index)}
            className="flex items-center gap-3 group focus:outline-none"
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-700  group-focus:ring-offset-2 group-focus:ring-offset-background ">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors  focus:ring-2 focus:ring-green-600  focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
