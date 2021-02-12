const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: ['public//2021/02/tailwind-draft/index.html'],
    options: {
      keyframes: true,
    },
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      borderOpacity: ['all'],
    },
    screens: {},
    fontFamily: {
      serif: ['Palatino', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
