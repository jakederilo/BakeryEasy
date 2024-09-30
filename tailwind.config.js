/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Or your main entry point file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your component files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f13a01",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        australia: ["Edu AU VIC WA NT Dots", "cursive"],
      },
    },
  },
  plugins: [],
};
