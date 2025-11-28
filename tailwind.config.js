/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rcar: {
          black: '#0a0a0a',
          dark: '#121212',
          graphite: '#1f2937',
          neon: '#06b6d4', // Cyan-500
          accent: '#0891b2', // Cyan-600
          glow: '#22d3ee', // Cyan-400
        }
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
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