/** @type {import('tailwindcss').Config} */
const colors = require('./src/presentation/ui/styles/colors.json');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karla200ExtraLight: ["Karla_200ExtraLight"],
        karla300Light: ["Karla_300Light"],
        karla400Regular: ["Karla_400Regular"],
        karla500Medium: ["Karla_500Medium"],
        karla600SemiBold: ["Karla_600SemiBold"],
        karla700Bold: ["Karla_700Bold"]
      },
      colors,
    },
  },
  plugins: [],
}

