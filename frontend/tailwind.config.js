/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
        garamond: ["EB Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
