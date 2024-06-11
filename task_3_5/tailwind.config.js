/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bright-green': 'rgba(0, 174, 28, 1)',
        'bg-gray': 'rgba(242, 245, 247, 1)',
        'dark-blue': 'rgba(36, 53, 115, 1)',
        'input-gray': 'rgba(115, 115, 115, 1)',
      },
    },
  },
  plugins: [],
};
