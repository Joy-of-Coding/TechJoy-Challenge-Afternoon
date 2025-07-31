import "./App.css";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import PriorityGrid from "./components/PriorityGrid";
import GoalTracker from "./components/GoalTracker";
import Timer from "./components/Timer";
import Plant from "./components/Plant";

export default function App() {
  return (
    <div className="app">
      <Header />

      {/* Timer + Plant section at the top */}
      <div className="timer-plant-section">
        <Timer />
        <Plant />
      </div>

      <main>
        {/* Toast notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Goal tracker */}
        <GoalTracker />

        {/* Priority task grid */}
        <PriorityGrid />
      </main>
    </div>
  );
}
