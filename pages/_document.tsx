import { IconContext } from '@react-icons/all-files'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
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
            <meta name='apple-mobile-web-app-title' content='JC Resume' />
            <link rel='manifest' href='/manifest.json' />
          </Head>

          <body>
            <script
              dangerouslySetInnerHTML={{
                __html: `
/** Inlined version of noflash.js from use-dark-mode */
;(function () {
  var storageKey = 'darkMode'
  var classNameDark = 'dark-mode'
  var classNameLight = 'light-mode'
  
  // Don't apply classes immediately to avoid hydration mismatch
  function setClassOnDocumentBody(darkMode) {
    requestAnimationFrame(function() {
      document.body.classList.add(darkMode ? classNameDark : classNameLight)
      document.body.classList.remove(darkMode ? classNameLight : classNameDark)
    })
  }

  // Wait for document to be fully loaded before applying theme
  if (document.readyState === 'complete') {
    initTheme()
  } else {
    document.addEventListener('DOMContentLoaded', initTheme)
  }

  function initTheme() {
    var preferDarkQuery = '(prefers-color-scheme: dark)'
    var mql = window.matchMedia(preferDarkQuery)
    var supportsColorSchemeQuery = mql.media === preferDarkQuery
    var localStorageTheme = null
    try {
      localStorageTheme = localStorage.getItem(storageKey)
    } catch (err) {}
    var localStorageExists = localStorageTheme !== null
    if (localStorageExists) {
      localStorageTheme = JSON.parse(localStorageTheme)
    }

    // Determine the source of truth
    if (localStorageExists) {
      // source of truth from localStorage
      setClassOnDocumentBody(localStorageTheme)
    } else if (supportsColorSchemeQuery) {
      // source of truth from system
      setClassOnDocumentBody(mql.matches)
      localStorage.setItem(storageKey, JSON.stringify(mql.matches))
    }
  }
})();
                `
              }}
            />
            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
