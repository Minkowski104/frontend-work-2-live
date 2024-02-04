/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "w2l-green":"#009E60",
        "blue-1":"#7CB9E8",
      }
    },
  },
  plugins: [],
}

