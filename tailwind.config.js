/** @type {import('tailwindcss').Config} */
const colors = require('./src/presentation/ui/styles/colors.json');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
      },
      colors,
    },
  },
  plugins: [],
}

