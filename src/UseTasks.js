import { useEffect, useState } from 'react'

const STORAGE_KEY = 'spaceliteral_tasks_v1'

function useTasks() {
  const [tasks, setTasks] = useState([])

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setTasks(JSON.parse(raw))
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage', err)
    }
  }, [])

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('Failed to save tasks to localStorage', err)
    }
  }, [tasks])

  function addTask({ title, description = '', priority = 'Medium' }) {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      done: false,
      createdAt: new Date().toISOString()
    }
    setTasks((t) => [newTask, ...t])
  }

  function toggleTask(id) {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  function deleteTask(id) {
    setTasks((t) => t.filter((task) => task.id !== id))
  }

  return { tasks, setTasks, addTask, toggleTask, deleteTask }
}

export default useTasks
