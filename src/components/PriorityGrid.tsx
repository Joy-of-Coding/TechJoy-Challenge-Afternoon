import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./PriorityGrid.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePlantPoints } from '../hooks/usePlantPoints';

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  animation?: string; // for fade in/out animations
}

const MAX_TASKS_TOTAL = 10;
const MAX_TASKS_PER_CATEGORY = 3;

const celebrateMessages = [
  "🎉 Woohoo! Another one bites the dust!",
  "💪 You crushed it!",
  "🌟 Boom! Done and dusted!",
  "🔥 On fire! Keep going!",
  "🍪 Cookie time — you earned it!"
];

const priorities = [
  { key: "Urgent & Important", className: "urgent-important" },
  { key: "Not Urgent & Important", className: "not-urgent-important" },
  { key: "Urgent & Not Important", className: "urgent-not-important" },
  { key: "Not Urgent & Not Important", className: "not-urgent-not-important" }
];

const PriorityGrid: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  // to be sure one Task is rewarded just one time when First it was completed and not 
  // when completed after undo it. I used the awarded-tasks similar to awarded-goals 
  // to avoid adding points for a  completed Tasks many times
  const [awardedTasks, setAwardedTasks] = useLocalStorage<string[]>('awarded-tasks', []);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(priorities[0].key);
  const [dueDate, setDueDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  // I added this line to initialize the planGrowthPoints to 0 
  // so I can use it here in this compnenet to store the growth persistenly 
  const [plantPoints, setPlantPoints] = useLocalStorage('plantGrowthPoints', 0);
  // i used that function to add point for a Task as I said I wanted to have different
  // Steps compared with the Goals , for the Tasks I choose 3 points for each completed 
  // Task sop that 10 tasks will give us 100% growth.
  const { addTaskPoints } = usePlantPoints();

  const categoryFull =
    tasks.filter(t => t.priority === priority && !t.completed).length >= MAX_TASKS_PER_CATEGORY;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    if (tasks.length >= MAX_TASKS_TOTAL) return;
    if (categoryFull) {
      toast.error(`You can only have ${MAX_TASKS_PER_CATEGORY} active tasks in "${priority}"`);
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
      animation: "fade-in"
    };

    setTasks(prev => [...prev, newTask]);
    setTitle("");
    setPriority(priorities[0].key);
    setDueDate("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nowCompleted = !task.completed;

          if (nowCompleted) {
            // 🎉 Celebration toast
            
            const message = celebrateMessages[Math.floor(Math.random() * celebrateMessages.length)];
            toast.success(message, {
              duration: 2500,
              style: { background: "#4caf50", color: "#fff", fontWeight: "bold" }
            });
        // Award 3 points only once when marking as complete for the first time
        // I checked if the Taks has  already rewards or not. if it is a new Task with 
        // no rewards < I add its related points which is  3  and add it to the awarded Tasks array in the persistence
        // storage. saved for later to check if it has already been rewarded. 
        if (nowCompleted && !awardedTasks.includes(id.toString())) {
          addTaskPoints();
          setAwardedTasks([...awardedTasks, task.id.toString()]);
        }

         return { ...task, completed: true, animation: "fade-out" };
          } else {
            // Undo — fade back in to active list
            return { ...task, completed: false, animation: "fade-in" };
          }
        }
        return task;
      })
    );
  };

  const renderTasksForPriority = (priorityLabel: string) =>
    tasks
      .filter(task => task.priority === priorityLabel && !task.completed)
      .map(task => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? "completed" : ""} ${task.animation || ""}`}
        >
          <div>
            <strong>{task.title}</strong>
            <div className="task-date">{task.dueDate}</div>
          </div>
          <div className="task-actions">
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </div>
        </div>
      ));

  const renderCompletedTasks = () =>
    tasks
      .filter(task => task.completed)
      .map(task => (
        <div
          key={task.id}
          className={`task-card completed ${task.animation || ""}`}
        >
          <div>
            <strong>{task.title}</strong>
            <div className="task-date">{task.dueDate}</div>
          </div>
          <div className="task-actions">
            <button onClick={() => handleToggleComplete(task.id)}>Undo</button>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </div>
        </div>
      ));

  return (
    <>
      {/* ===== Add Task Form ===== */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
          maxLength={140}
        />
        <div className="char-info">
          Limit: 140 characters ({140 - title.length} remaining)
        </div>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
        >
          {priorities.map(p => (
            <option key={p.key}>{p.key}</option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
        />

        <button type="submit" disabled={tasks.length >= MAX_TASKS_TOTAL || categoryFull}>
          Add Task
        </button>

        {tasks.length >= MAX_TASKS_TOTAL && (
          <p className="limit-warning">Task limit reached (max {MAX_TASKS_TOTAL} tasks)</p>
        )}
        {categoryFull && (
          <p className="limit-warning">
            Max {MAX_TASKS_PER_CATEGORY} active tasks allowed in this category
          </p>
        )}
      </form>

      {/* ===== Priority Grid ===== */}
      <section>
        <div className="grid-header">
          <h2>🟨 Priority Grid</h2>
        </div>
        <div className="priority-grid">
          {priorities.map(p => (
            <div key={p.key} className={`card ${p.className}`}>
              <h3>{p.key}</h3>
              <div className="task-placeholder">{renderTasksForPriority(p.key)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Completed Tasks Section ===== */}
      {tasks.some(t => t.completed) && (
        <div className="completed-tasks-section">
          <div className="completed-header">
            <h3>✅ Completed Tasks</h3>
            <button
              className="toggle-btn"
              onClick={() => setShowCompleted(prev => !prev)}
            >
              {showCompleted ? "Hide" : "Show"}
            </button>
          </div>

          {showCompleted && (
            <div className="card completed-tasks">
              <div className="task-placeholder">{renderCompletedTasks()}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PriorityGrid;