/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-gray': 'rgba(34, 34, 34, 1)',
        'silver-gray': 'rgba(139, 139, 139, 1)',
        'metallic-gray': 'rgba(69, 69, 69, 1)',
        'light-gray': 'rgba(66, 66, 66, 1)',
        'middle-gray': 'rgba(49, 49, 49, 1)',
        'steal-gray': 'rgba(125, 125, 125, 1)',
      },
      borderWidth: {
        thin: '1px',
      },
    },
  },
  plugins: [],
};
