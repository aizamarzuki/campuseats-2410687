import { useState, useEffect } from 'react'
/**
 * Custom Hook: useLocalStorage
 * Works like useState, but automatically saves and loads data from localStorage.
 */
export function useLocalStorage(key, initialValue) {
  // Lazy state initialization: function runs only ONCE when component mounts
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      // Return parsed JSON if found, otherwise fallback to initialValue
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (e) {
      console.error(`Error reading key "${key}" from localStorage:`, e)
      return initialValue
    }
  })

  // Synchronize localStorage whenever the key or value updates
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(`Error writing key "${key}" to localStorage:`, e)
    }
  }, [key, value])

  return [value, setValue]
}