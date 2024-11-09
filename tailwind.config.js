/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        borderTransition: 'borderTransition 3s linear',
        fadeInDelayed: 'fadeIn 1s ease-in 3s', 
        fadeInDelayedShort: 'fadeIn 1s ease-in 1.3s', 
      },
      keyframes: {
        borderTransition: {
          '0%': { borderColor: '#333' },
          '50%': { borderColor: 'white' },
          '100%': { borderColor: '#333' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

