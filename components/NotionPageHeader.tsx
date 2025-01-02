import type * as types from 'notion-types'
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search } from 'react-notion-x'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  // Delay render until component mounted to align with client-side JS workload
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  // Render a loading state or placeholder until mounted
  if (!hasMounted) {
    return <div className={styles.loadingPlaceholder}>Loading...</div> // Placeholder while loading
  }

  return (
    <div className={cs('breadcrumb', 'button')} onClick={onToggleTheme}>
      {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const router = useRouter()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.url) {
                return null
              }

              return (
                <Link
                  href={link.url}
                  key={index}
                  className={cs(styles.navLink, 'breadcrumb', 'button')}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(link.url)
                  }}
                >
                  {link.title}
                </Link>
              )
            })
            .filter(Boolean)}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
