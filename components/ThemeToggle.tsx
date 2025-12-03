import { IoMoonSharp, IoSunnyOutline, IoDesktop } from 'react-icons/io5'
import * as React from 'react'
import cs from 'classnames'

import { useDarkMode } from '@/lib/use-dark-mode'

interface ThemeToggleProps {
  className?: string
  showSystemOption?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button' | 'dropdown'
}

/**
 * Modern theme toggle component using next-themes
 *
 * Features:
 * - Light/Dark/System theme options
 * - Smooth transitions
 * - Accessible keyboard navigation
 * - Multiple variants and sizes
 * - No flash of wrong theme
 */
export function ThemeToggle({
  className,
  showSystemOption = false,
  size = 'md',
  variant = 'icon'
}: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode()

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cs(
          'inline-flex items-center justify-center',
          getSizeClasses(size),
          className
        )}
      >
        <div className='animate-pulse bg-gray-300 rounded' />
      </div>
    )
  }

  if (variant === 'dropdown' && showSystemOption) {
    return <ThemeDropdown className={className} size={size} />
  }

  if (variant === 'button') {
    return (
      <button
        type='button'
        onClick={toggleDarkMode}
        className={cs(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          getSizeClasses(size),
          className
        )}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <>
            <IoSunnyOutline className='mr-2 w-8 h-8' />
            Light
          </>
        ) : (
          <>
            <IoMoonSharp className='mr-2 w-8 h-8' />
            Dark
          </>
        )}
      </button>
    )
  }

  // Default icon variant
  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      className={cs(
        'inline-flex items-center justify-center border-none transition-colors rounded-none',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        getSizeClasses(size),
        className
      )}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <IoSunnyOutline className='w-8 h-8' />
      ) : (
        <IoMoonSharp className='w-8 h-8' />
      )}
    </button>
  )
}

/**
 * Dropdown variant with system option
 */
function ThemeDropdown({
  className,
  size
}: {
  className?: string
  size: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const {
    isDarkMode,
    isLightMode,
    isSystemMode,
    setLightMode,
    setDarkMode,
    setSystemMode
  } = useDarkMode()

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentIcon = isSystemMode ? (
    <IoDesktop />
  ) : isDarkMode ? (
    <IoMoonSharp />
  ) : (
    <IoSunnyOutline />
  )

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={cs(
          'inline-flex items-center justify-center rounded-md transition-colors',
          'hover:bg-gray-100 hover:text-gray-900',
          'dark:hover:bg-gray-800 dark:hover:text-gray-100',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          getSizeClasses(size),
          className
        )}
        title='Change theme'
        aria-label='Change theme'
        aria-expanded={isOpen}
      >
        {currentIcon}
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full mt-1 w-36 rounded-md border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50'>
          <div className='p-1'>
            <button
              type='button'
              onClick={() => {
                setLightMode()
                setIsOpen(false)
              }}
              className={cs(
                'w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                isLightMode && !isSystemMode && 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <IoSunnyOutline />
              Light
            </button>
            <button
              type='button'
              onClick={() => {
                setDarkMode()
                setIsOpen(false)
              }}
              className={cs(
                'w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                isDarkMode && !isSystemMode && 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <IoMoonSharp />
              Dark
            </button>
            <button
              type='button'
              onClick={() => {
                setSystemMode()
                setIsOpen(false)
              }}
              className={cs(
                'w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                isSystemMode && 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <IoDesktop />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function getSizeClasses(size: string) {
  switch (size) {
    case 'sm':
      return 'h-8 w-8 text-sm'
    case 'lg':
      return 'h-12 w-12 text-lg'
    case 'md':
    default:
      return 'h-10 w-10 text-base'
  }
}

/**
 * Legacy compatibility component
 * @deprecated Use ThemeToggle instead
 */
export function DarkModeToggle(props: ThemeToggleProps) {
  return <ThemeToggle {...props} />
}
