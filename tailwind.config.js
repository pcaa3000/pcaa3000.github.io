/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          violet: '#8b5cf6',
          cyan: '#22d3ee',
          emerald: '#34d399',
        },
      },
    },
  },
  plugins: [],
};
