/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan src directory for potential classes (e.g., App.js, index.js)
    "./components/**/!({category,product}).{js,jsx}"
, // Scan components directory for classes (e.g., ProductCard.jsx, Button.jsx)
  ],
  theme: {
    extend: {},
  },
  plugins: [
   
  ],
}

