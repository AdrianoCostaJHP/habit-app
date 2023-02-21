import "./lib/dayjs";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <ToastContainer pauseOnHover={false} position="top-right" />
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />
          <SummaryTable />
        </div>
      </div>
    </>
  );
}
