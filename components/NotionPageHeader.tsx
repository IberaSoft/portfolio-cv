import type * as types from 'notion-types'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search } from 'react-notion-x'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { ThemeToggle } from './ThemeToggle'

function ToggleThemeButton() {
  return (
    <ThemeToggle
      className={cs(
        'breadcrumb',
        'button',
        'transition-colors duration-[250ms] ease-out',
        'hover:text-social-twitter hover:transition-colors hover:duration-[50ms] hover:ease-out'
      )}
      size='sm'
    />
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
                  className={cs('breadcrumb', 'button')}
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
