/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",   // 🔥 THIS WAS MISSING
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

