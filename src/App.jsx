import React, { useContext } from "react";
import TaskForm from "./components/TaskForm";
import useTasks from "./useTasks";
import { ThemeContext } from "./ThemeContext";

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="empty">No tasks yet — add one!</p>;

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t.id} className={t.done ? "done" : ""}>
          <div className="task-main">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
            />
            <div className="task-info">
              <div className="task-title">{t.title}</div>
              {t.description && (
                <div className="task-desc">{t.description}</div>
              )}
            </div>
          </div>

          <div className="task-controls">
            <span className="priority">{t.priority}</span>
            <button className="delete" onClick={() => onDelete(t.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>My Personal Task Manager</h1>
        <div>
          <button onClick={toggleTheme} className="theme-toggle">
            Switch to {theme === "light" ? "dark" : "light"}
          </button>
        </div>
      </header>

      <main>
        <TaskForm onAddTask={addTask} />

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      <footer>
        <small>{new Date().getFullYear()} My Personal Task Manager</small>
        <small>Tasks are saved in your browser (localStorage).</small>
      </footer>
    </div>
  );
}
