/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#D90056', // Primary red color
          dark: '#9F2957', // Darker shade of red
        },
        orange: {
          DEFAULT: '#E25D33', // Primary orange color
        },
        yellow: {
          DEFAULT: '#DFC45A', // Primary yellow color
          dark: '#B8C42F',
        },
        green: {
          DEFAULT: '#16AF6E', // Primary green color
          dark: '#397E49', // Darker shade of green
          light: '#429488',
        },
        blue: {
          DEFAULT: '#439BDF', // Primary blue color
          dark: '#4254AF', // Darker shade of blue
          light: '#6C7AC4', // Lighter blue shade
        },
        neutral: {
          light: '#F2F5F7', // Light neutral background
          DEFAULT: '#BFBFBF', // Mid-tone neutral
          dark: '#323749', // Dark neutral
        },
        purple: {
          DEFAULT: '#8332A4', // Primary purple color
          light: '#6C7AC4',
        },
      },
      fonts: {
        font_family__sans: '"Roboto", sans-serif',
        font_family__secondary: '"Inter", sans-serif',
      },
    },
  },
  safelist: [
    'red-dark',
    'red',
    'orange',
    'yellow',
    'yellow-dark',
    'green',
    'green-light',
    'green-dark',
    'blue',
    'blue-light',
    'purple',
    'purple-light',
  ].flatMap((color) => [`bg-${color}`, `border-${color}`]),
  plugins: [],
};
