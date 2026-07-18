/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050505', // true black/very dark grey
          darker: '#000000',
        },
        primary: {
          DEFAULT: '#d4af37', // gold
          dark: '#aa8c2c',
        },
        secondary: {
          DEFAULT: '#c0c0c0', // silver
          dark: '#999999',
        },
        accent: {
          DEFAULT: '#ffd700', // bright gold
          dark: '#b8860b',
        },
        success: '#00FF88',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        monument: ['"Monument Extended"', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
