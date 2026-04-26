import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./PriorityGrid.css";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  animation?: string; // for fade in/out animations
}

// dw  added - this did not work to effect a global export of the value
//export const curTaskCount = 0
//export curTaskCount = tasks.length * 10

// Global exports: 
//declare global {
//  var curTaskCount : number;
//}
//
// Assign the value globally
//(globalThis as any).curTaskCount = 0;
//
// later in code: tasks.length * 10;

export {}; // Ensures this file is treated as a module

// dw added end this block. 

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
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(priorities[0].key);
  const [dueDate, setDueDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

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
//
//
// added by djw but did not work:
//
//      curTaskCount = tasks.length * 10;
//
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