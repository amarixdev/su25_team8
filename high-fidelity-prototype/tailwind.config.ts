import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#00205B',
          50: '#e6eaf3',
          100: '#cdd5e8',
          200: '#9faece',
          300: '#7187b5',
          400: '#45619b',
          500: '#00205B', // your main color
          600: '#001c52',
          700: '#001846',
          800: '#00143a',
          900: '#000d25',
        }
      }
    },
  },
  plugins: [],
} satisfies Config 