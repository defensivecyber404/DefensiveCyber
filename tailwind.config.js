/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#090514', // very dark purple/black
          darker: '#05020a',
        },
        primary: {
          DEFAULT: '#c77dff', // neon purple
          dark: '#9d4edd',
        },
        secondary: {
          DEFAULT: '#e0aaff',
          dark: '#c77dff',
        },
        accent: {
          DEFAULT: '#ff00ff', // magenta
          dark: '#cc00cc',
        },
        success: '#00FF88',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(199, 125, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(199, 125, 255, 0.1) 1px, transparent 1px)',
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
