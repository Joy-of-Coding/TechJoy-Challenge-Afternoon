import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./PriorityGrid.css";

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

const PriorityGrid: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Urgent & Important");
  const [dueDate, setDueDate] = useState("");

  // Celebration messages
  const celebrateMessages = [
    "🎉 Woohoo! Another one bites the dust!",
    "💪 You crushed it!",
    "🌟 Boom! Done and dusted!",
    "🔥 On fire! Keep going!",
    "🍪 Cookie time — you earned it!"
  ];

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Check if selected category is full (max 2 tasks per category)
  const categoryFull =
    tasks.filter((task) => task.priority === priority && !task.completed).length >= 2;

  // Add a new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !dueDate) return; // Must have title & date
    if (tasks.length >= 10) return; // Total limit
    if (categoryFull) {
      toast.error(`You can only have 2 active tasks in "${priority}"`);
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setPriority("Urgent & Important");
    setDueDate("");
  };

  // Delete a task
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Complete a task
  const handleCompleteTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nowCompleted = !task.completed;

          // Only celebrate when marking as complete
          if (nowCompleted) {
            const message =
              celebrateMessages[Math.floor(Math.random() * celebrateMessages.length)];
            toast.success(message, {
              duration: 2500,
              style: { background: "#4caf50", color: "#fff", fontWeight: "bold" }
            });
          }

          return { ...task, completed: nowCompleted };
        }
        return task;
      })
    );
  };

  // Render tasks for each priority (hide completed ones)
  const renderTasksForPriority = (priorityLabel: string) => {
    return tasks
      .filter((task) => task.priority === priorityLabel && !task.completed) // ✅ hides completed
      .map((task) => (
        <div key={task.id} className="task-card">
          <div>
            <strong>{task.title}</strong>
            <div className="task-date">{task.dueDate}</div>
          </div>
          <div className="task-actions">
            <button onClick={() => handleCompleteTask(task.id)}>
              Complete
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </div>
        </div>
      ));
  };

  return (
    <div className="priority-container">
      <h2 className="priority-heading">Priority Tasks</h2>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={tasks.length >= 10}
          maxLength={140}
        />
        <div className="char-info">
          Limit: 140 characters ({140 - title.length} remaining)
        </div>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={tasks.length >= 10} // Always allow switching categories
        >
          <option>Urgent & Important</option>
          <option>Not Urgent & Important</option>
          <option>Urgent & Not Important</option>
          <option>Not Urgent & Not Important</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={tasks.length >= 10}
        />

        <button type="submit" disabled={tasks.length >= 10 || categoryFull}>
          Add Task
        </button>

        {tasks.length >= 10 && (
          <p className="limit-warning">Task limit reached (max 10 tasks)</p>
        )}
        {categoryFull && (
          <p className="limit-warning">
            Max 2 active tasks allowed in this category
          </p>
        )}
      </form>

      {/* Priority Grid */}
      <div className="priority-grid">
        <div className="grid-container">
          <div className="grid-item urgent-important">
            <h3>Urgent & Important</h3>
            {renderTasksForPriority("Urgent & Important")}
          </div>
          <div className="grid-item not-urgent-important">
            <h3>Not Urgent & Important</h3>
            {renderTasksForPriority("Not Urgent & Important")}
          </div>
          <div className="grid-item urgent-not-important">
            <h3>Urgent & Not Important</h3>
            {renderTasksForPriority("Urgent & Not Important")}
          </div>
          <div className="grid-item not-urgent-not-important">
            <h3>Not Urgent & Not Important</h3>
            {renderTasksForPriority("Not Urgent & Not Important")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityGrid;
