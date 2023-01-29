/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ca025a",
        primaryHover: "#b1004f",
      },
    },
  },
  plugins: [],
};
