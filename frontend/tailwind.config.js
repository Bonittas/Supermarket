/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.html"],
  theme: {
    fontFamily: {
      cursive: ["CursiveFontName", "cursive", "sans-serif"],
    },

    extend: {
      colors: {
        "header-color": "#f5f5f5",
      },
    },
  },

  plugins: [],
};
