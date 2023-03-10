import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";
import { HabitForm } from "./HabitForm";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logo} alt="Habits logo" />
      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700  focus:ring-offset-2 focus:ring-offset-background"
        >
          Novo hábito
          <Plus size={20} className="text-violet-500" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0"/>
          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close>
              <X size={20} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-200  "/>
            </Dialog.Close>
            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Criar hábito
            </Dialog.Title>
            <HabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Header;
