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

    // Read current state from DOM (set synchronously by the inline script in _document.tsx)
    // The inline script applies the class before React hydrates, so this is reliable
    const currentIsDark = document.body.classList.contains(CLASS_NAME_DARK)

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
