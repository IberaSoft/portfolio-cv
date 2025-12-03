import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Modern dark mode hook using next-themes
 *
 * This replaces the old implementation that used dangerouslySetInnerHTML
 * and provides a cleaner, more reliable theme management system.
 *
 * Features:
 * - No flash of wrong theme (FOWT)
 * - System preference detection
 * - Persistent user preference
 * - SSR-safe hydration
 * - TypeScript support
 */
export function useDarkMode() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only showing theme-dependent content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? resolvedTheme === 'dark' : false

  const toggleDarkMode = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const setLightMode = () => setTheme('light')
  const setDarkMode = () => setTheme('dark')
  const setSystemMode = () => setTheme('system')

  return {
    // Theme state
    isDarkMode,
    isLightMode: mounted ? resolvedTheme === 'light' : true,
    isSystemMode: theme === 'system',
    mounted,

    // Current themes
    theme,
    resolvedTheme,
    systemTheme,

    // Theme setters
    toggleDarkMode,
    setLightMode,
    setDarkMode,
    setSystemMode,
    setTheme
  }
}

/**
 * Legacy compatibility export
 * @deprecated Use the enhanced useDarkMode hook instead
 */
export { useDarkMode as useDarkModeTheme }
