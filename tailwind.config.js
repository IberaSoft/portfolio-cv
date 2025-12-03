/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: ['class', '.dark-mode'], // Use class-based dark mode with custom class name
  theme: {
    extend: {
      colors: {
        // Map current CSS variables for seamless transition
        fg: {
          DEFAULT: 'var(--fg-color)',
          0: 'var(--fg-color-0)',
          1: 'var(--fg-color-1)',
          2: 'var(--fg-color-2)',
          3: 'var(--fg-color-3)',
          6: 'var(--fg-color-6)'
        },
        bg: {
          DEFAULT: 'var(--bg-color)',
          0: 'var(--bg-color-0)',
          1: 'var(--bg-color-1)'
        },
        // Social media brand colors from current CSS
        social: {
          facebook: '#3b5998',
          twitter: '#2795e9',
          linkedin: '#0077b5',
          github: '#c9510c',
          youtube: '#ff0000',
          medium: '#00ab6c',
          newsletter: '#777777',
          email: '#777777',
          mastodon: '#5a4be1',
          zhihu: '#0066ff'
        },
        // Notion-specific colors
        notion: {
          blue: '#67bdfc',
          'light-yellow': '#fff697',
          'light-pink': '#f5b8d1',
          'light-blue': '#adedfc',
          'light-red': '#f5c4ff',
          'light-green': '#d4eabc',
          'dark-blue': '#96b8ec'
        }
      },
      fontFamily: {
        notion: 'var(--notion-font)',
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Roboto"',
          '"Oxygen"',
          '"Ubuntu"',
          '"Cantarell"',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          '"Noto Sans"',
          'sans-serif'
        ]
      },
      maxWidth: {
        notion: '768px',
        'notion-wide': '1024px',
        site: '1100px'
      },
      height: {
        'notion-header': '54px'
      },
      spacing: {
        notion: '2vmin'
      },
      width: {
        160: '640px'
      },
      borderRadius: {
        notion: '16px',
        'notion-lg': '24px'
      },
      boxShadow: {
        notion: '2px 2px 8px 4px rgba(15, 15, 15, 0.1)',
        'notion-hero': '0 8px 40px 0 rgb(0 0 0 / 21%)'
      },
      backdropBlur: {
        notion: '16px',
        'notion-dark': '20px'
      },
      backgroundImage: {
        'gradient-notion':
          'linear-gradient(90.68deg, #b439df 0.26%, #e5337e 102.37%)'
      },
      keyframes: {
        spinner: {
          to: { transform: 'rotate(360deg)' }
        },
        'octocat-wave': {
          '0%, 100%': { transform: 'rotate(0)' },
          '20%, 60%': { transform: 'rotate(-25deg)' },
          '40%, 80%': { transform: 'rotate(10deg)' }
        }
      },
      animation: {
        'spin-slow': 'spinner 0.6s linear infinite',
        'octocat-wave': 'octocat-wave 560ms ease-in-out'
      }
    }
  },
  plugins: []
}
