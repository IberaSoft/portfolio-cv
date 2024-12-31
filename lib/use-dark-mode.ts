import useDarkModeImpl from '@fisch0920/use-dark-mode'
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [mounted, setMounted] = useState(false)
  const darkMode = useDarkModeImpl(false, { classNameDark: 'dark-mode' })

  // Only show dark mode after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    isDarkMode: mounted ? darkMode.value : false,
    toggleDarkMode: darkMode.toggle
  }
}
