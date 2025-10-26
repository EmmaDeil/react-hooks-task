import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [errors, setErrors] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = "Title is required.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setErrors({});
  };

  return (
    <form className="task-form" onSubmit={handleAdd}>
      <div className="row">
        <input
          aria-label="Task title"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Add Task</button>
      </div>

      <div className="row">
        <input
          aria-label="Description"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {errors.title && <div className="error">{errors.title}</div>}
    </form>
  );
}

export default TaskForm;
