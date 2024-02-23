/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "spider-man": ["spider", "sans-serif"],
        "Montserrat-Alternates": ["montserrat", "sans-serif"],
        "amazing-spider": ["amazspi", "serif"],
      },
    },
  },
  plugins: [],
}

