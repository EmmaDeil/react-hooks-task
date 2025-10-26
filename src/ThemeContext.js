import { createContext } from 'react'

// Separate file that only exports the context object.
// Keeping this file free of components helps Fast Refresh work correctly.
export const ThemeContext = createContext()
