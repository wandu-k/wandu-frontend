/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        light: "0 25px 50px 0px rgba(0, 0, 0, 0.05);",
      },
    },
  },
  plugins: [],
};
