/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0E14',
        surface: '#111827',
        border: '#1F2937',
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
        },
        accent: '#3B82F6',
        negative: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.1em',
      },
    },
  },
  plugins: [],
}

