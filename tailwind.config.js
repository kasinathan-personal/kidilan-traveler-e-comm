/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: 'rgb(var(--color-midnight) / <alpha-value>)',
        sand: 'rgb(var(--color-sand) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        rust: 'rgb(var(--color-rust) / <alpha-value>)',
        slate: 'rgb(var(--color-slate) / <alpha-value>)'
      },
      fontFamily: {
        display: ['Onest', 'sans-serif'],
        sans: ['Onest', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        luxury: '0 10px 30px rgba(0,0,0,0.12)'
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem'
      }
    }
  },
  plugins: []
} 