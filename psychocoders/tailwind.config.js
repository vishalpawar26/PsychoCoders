/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#242424",
        "gray": "#303030",
        "light-gray": "#363636",
        "yellow": "#FEBE10",
        "dark-yellow": "#f89d16",
        "white": "#ffffff",
        "green": "#2cbb5d",
        "dark-green": "#538247",
        "light-green": "#bedcbb",
        "dark-red": "#ff5e4d",
        "light-red": "#ffc8bd",
      }
    },
    fontFamily: {
      roboto: ["Roboto Mono", "monospace"]
    }
  },
  plugins: [],
}