import { useEffect, useState } from 'react'

const STORAGE_KEY = 'darkMode'
const CLASS_NAME_DARK = 'dark-mode'
const CLASS_NAME_LIGHT = 'light-mode'

export function useDarkMode() {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Read current state from DOM (set by the inline script)
    const currentIsDark = document.body.classList.contains(CLASS_NAME_DARK)

    // Also check localStorage for consistency
    let storedValue = false
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      storedValue = stored !== null ? JSON.parse(stored) : false
    } catch (err) {
      console.warn(
        'Failed to read dark mode preference from localStorage:',
        err
      )
    }

    // If DOM and localStorage don't match, trust the DOM (set by inline script)
    // but update localStorage to match
    if (currentIsDark !== storedValue) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentIsDark))
      } catch (err) {
        console.warn(
          'Failed to sync dark mode preference to localStorage:',
          err
        )
      }
    }

    setIsDarkMode(currentIsDark)
    setMounted(true)
  }, [])

  const updateBodyClasses = (dark: boolean) => {
    if (typeof document === 'undefined') return

    if (dark) {
      document.body.classList.remove(CLASS_NAME_LIGHT)
      document.body.classList.add(CLASS_NAME_DARK)
    } else {
      document.body.classList.remove(CLASS_NAME_DARK)
      document.body.classList.add(CLASS_NAME_LIGHT)
    }
  }

  const toggleDarkMode = () => {
    const newValue = !isDarkMode
    setIsDarkMode(newValue)
    updateBodyClasses(newValue)

    // Store preference
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    } catch (err) {
      console.warn('Failed to save dark mode preference to localStorage:', err)
    }
  }

  return {
    isDarkMode: mounted ? isDarkMode : false,
    toggleDarkMode
  }
}
