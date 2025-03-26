/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "para-font":["Libre Baskerville", "serif"],
        "sideheading-font":[ "Playfair Display", "serif"],
        "heading-font":["Big Shoulders Inline", "sans-serif"],
        "para2-font":["Gentium Plus", "serif"],
      },
      colors: {
        customBrown: 'rgb(75, 69, 62)',
        customOrange: 'rgb(174,132,96)',
        customHoverOrange: 'rgb(195,166,128)',
        customHeroText: 'rgb(251,180,87)'
      }
    },
  },
  plugins: [],
}

