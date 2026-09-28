/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zinc: {
          850: '#1e1e24',
          950: '#09090b',
        },
        neon: {
          green: '#00ff66',
          cyan: '#00f0ff',
          pink: '#ff007f',
          yellow: '#ffe600',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'flat-neon-green': '4px 4px 0px 0px #00ff66',
        'flat-neon-cyan': '4px 4px 0px 0px #00f0ff',
        'flat-neon-pink': '4px 4px 0px 0px #ff007f',
        'flat-dark': '4px 4px 0px 0px #18181b',
      }
    },
  },
  plugins: [],
}
