/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[class="dark"]'],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
};
