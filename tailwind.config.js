/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "bg-green-900",
    "bg-pink-900",
    "bg-orange-900", 
    "bg-blue-900",
    "bg-red-900",
    "bg-blue-950",
    "bg-red-950",
    "bg-blue-200",
    "bg-green-200",
    "bg-green-950",
    "bg-pink-950",
    "bg-amber-900",
    "bg-indigo-950",
    "text-green-400",
    "text-pink-400",
    "text-yellow-400",
    "bg-red-200",
    "bg-orange-200",
    "text-yellow-300",
    "text-orange-400",
    "text-red-400",
  ],

  theme: {
    extend: {
      animation: {
        borderTransition: 'borderTransition 3s linear',
        fadeInDelayed: 'fadeIn 1s ease-in 2.8s', 
        fadeInDelayedShort: 'fadeIn 1s ease-in 1.1s', 
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
      screens: {
        'xs': '300px',
        '2xl': '1700px',
      },
    },
  },
  plugins: [],
}
