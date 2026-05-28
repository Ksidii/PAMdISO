/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./App.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")], // Ta linijka jest KRYTYCZNA
  theme: {
    extend: {},
  },
  plugins: [],
}