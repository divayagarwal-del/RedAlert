module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    'font-lobster', // ensure custom font class is never removed
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['"Lobster Two"', 'cursive'], // custom font class
      },
    },
  },
  plugins: [],
  important: true, // Make all Tailwind classes higher priority
};






// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

