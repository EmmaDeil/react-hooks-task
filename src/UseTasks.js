import { useEffect, useState } from 'react'

const STORAGE_KEY = 'spaceliteral_tasks_v1'
const LEGACY_KEYS = ['spaceliteral_tasks', 'spaceliteral_tasks_v0', 'tasks']

function safeParse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function useTasks() {
  const [tasks, setTasks] = useState([])

  // Load tasks from localStorage on mount (with defensive parsing and migration)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = safeParse(raw)
        if (Array.isArray(parsed)) {
          setTasks(parsed)
          return
        }
      }

      // Try legacy keys and migrate if found
      for (const key of LEGACY_KEYS) {
        const legacyRaw = localStorage.getItem(key)
        if (!legacyRaw) continue
        const legacyParsed = safeParse(legacyRaw)
        if (Array.isArray(legacyParsed)) {
          setTasks(legacyParsed)
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyParsed))
          } catch {
            // ignore write errors
          }
          break
        }
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage', err)
    }

    // Storage event listener for tab-sync
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return
      try {
        const parsed = e.newValue ? safeParse(e.newValue) : []
        if (Array.isArray(parsed)) setTasks(parsed)
      } catch (err) {
        console.error('Failed to parse storage event for tasks', err)
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
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
      createdAt: new Date().toISOString(),
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
