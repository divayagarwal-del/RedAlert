module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    'font-lobster', // ensure custom font class is never removed
    'bg-green-200',
    'text-green-800',
    'bg-[#af8fe9]/20',
    'text-[#4f3a9a]',
    'bg-blue-200',
    'text-blue-800',
    'bg-yellow-200',
    'text-yellow-800',
    'bg-gray-200',
    'text-gray-800',
    'new check'
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

