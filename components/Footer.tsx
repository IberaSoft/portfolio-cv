import * as React from 'react'
import { PageSocial } from './PageSocial'
import { ThemeToggle } from './ThemeToggle'
import { cs } from 'react-notion-x'

export function FooterImpl() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className='w-full max-w-notion mx-auto mt-auto mb-4'
      style={{ padding: '2rem 1.5rem' }}
    >
      <div className='grid grid-cols-3 items-center justify-items-center max-md:flex max-md:flex-col max-md:gap-4'>
        {/* Left: Copyright */}
        <div
          className='text-gray-500 dark:text-gray-400 max-md:order-3 max-md:text-center'
          style={{ fontSize: 'var(--font-size-copyright)' }}
        >
          {`© Copyright 2009 - ${currentYear}.`}
        </div>

        {/* Center: Theme Toggle */}
        <div className='select-none flex justify-center max-md:order-1'>
          <ThemeToggle
            className={cs(
              'breadcrumb',
              'transition-colors duration-[250ms] ease-out',
              'w-10 h-10 bg-transparent hover:text-social-twitter hover:transition-colors hover:duration-[50ms] hover:ease-out'
            )}
            size='lg'
          />
        </div>

        {/* Right: Social Buttons (visible on mobile, hidden on desktop where sticky version shows) */}
        <div className='select-none flex justify-center max-md:order-2 md:hidden'>
          <PageSocial variant='footer' />
        </div>
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
