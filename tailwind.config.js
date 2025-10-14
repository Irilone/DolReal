/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f0f9ff',
          foreground: '#0c4a6e',
        },
        background: '#ffffff',
        foreground: '#0c4a6e',
        card: '#ffffff',
        'card-foreground': '#0c4a6e',
        muted: '#f0f9ff',
        'muted-foreground': '#64748b',
        accent: '#e0f2fe',
        'accent-foreground': '#0c4a6e',
        border: '#e2e8f0',
      },
    },
  },
  plugins: [],
}
