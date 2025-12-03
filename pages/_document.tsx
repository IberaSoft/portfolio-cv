import { Head, Html, Main, NextScript } from 'next/document'

/**
 * Custom Document component for the portfolio website
 *
 * This file handles:
 * - HTML document structure
 * - Meta tags and favicon configuration
 * - PWA manifest setup
 * - Theme detection and prevention of flash of wrong theme
 *
 * Uses next-themes for modern theme management without dangerouslySetInnerHTML
 */
export default function Document() {
  return (
    <Html lang='en' suppressHydrationWarning>
      <Head>
        {/* Favicon Configuration */}
        <FaviconLinks />

        {/* PWA Configuration */}
        <PWAMeta />

        {/* Performance and SEO meta tags */}
        <PerformanceMeta />
      </Head>

      <body className='antialiased'>
        {/* Prevent flash of wrong theme - handled by next-themes ThemeProvider */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

/**
 * Favicon and app icon configuration component
 */
function FaviconLinks() {
  return (
    <>
      <link
        rel='icon'
        type='image/png'
        href='/favicon-96x96.png'
        sizes='96x96'
      />
      <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
    </>
  )
}

/**
 * Progressive Web App meta tags
 */
function PWAMeta() {
  return (
    <>
      <meta name='apple-mobile-web-app-title' content='JC Resume' />
      <meta name='application-name' content='JC Resume' />
      <meta
        name='theme-color'
        content='#ffffff'
        media='(prefers-color-scheme: light)'
      />
      <meta
        name='theme-color'
        content='#1f2027'
        media='(prefers-color-scheme: dark)'
      />
      <link rel='manifest' href='/manifest.json' />
    </>
  )
}

/**
 * Performance and SEO optimization meta tags
 */
function PerformanceMeta() {
  return (
    <>
      {/* DNS Prefetch for external domains */}
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />
      <link rel='dns-prefetch' href='//www.notion.so' />

      {/* Preconnect to important domains */}
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />

      {/* Google Fonts - Modern Minimalistic Typography */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Source+Sans+Pro:wght@400;500;600&display=swap'
        rel='stylesheet'
      />

      {/* Viewport meta for responsive design */}
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, viewport-fit=cover'
      />

      {/* Color scheme preference */}
      <meta name='color-scheme' content='light dark' />
    </>
  )
}
