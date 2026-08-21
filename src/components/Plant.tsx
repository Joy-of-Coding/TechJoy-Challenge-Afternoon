import { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { plantStages } from '../assets/plantStages';
import type { Task } from './PriorityGrid';

const stageMessages = [
  "Complete tasks to grow your plant!",
  "Nice! Your plant is sprouting!",
  "Growing steadily, keep it up!",
  "Look at that bud forming!",
  "Beautiful! Your plant is blooming!",
  "Amazing! Your plant is celebrating! 🎉",
];

export default function Plant() {
  const [tasks] = useLocalStorage<Task[]>('tasks', []);

  const completedCount = useMemo(
    () => tasks.filter(task => task.completed).length,
    [tasks]
  );

  // Every 2 completed tasks advances a stage, capping at stage 5 (full grown at 10 tasks)
  const currentStage = useMemo(
    () => Math.min(5, Math.ceil(completedCount / 2)),
    [completedCount]
  );

  return (
    <section>
      <h2>🌿 Plant Progress Tracker 🌿</h2>

      <div style={{ fontSize: "5rem", margin: "1.5rem 0", textAlign: "center" }}>
        {plantStages[currentStage]}
      </div>

      <div style={{
        fontSize: "1.2rem",
        margin: "1rem 0",
        color: "#555",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        {/* {completedCount} / 10 tasks completed */}
      </div>

      <div style={{
        fontSize: "0.9rem",
        color: "#888",
        marginTop: "1rem",
        textAlign: "center"
      }}>
        {stageMessages[currentStage]}
      </div>
    </section>
  );
}