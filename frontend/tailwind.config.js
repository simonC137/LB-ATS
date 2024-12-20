/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'], // Added Jost font here
      },
      colors: {
        'custom-blue': '#67B6D5',
      },
    },
  },
  plugins: [require('daisyui')],
};
