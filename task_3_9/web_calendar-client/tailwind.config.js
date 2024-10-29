/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        color_primary: '#00ae1c',
        color_secondary: '#ffffff',
        color_primary__pressed: '#0cd52b',
        border_color: '#323749',
        rosePink: '#9F2957',
        deepPink: '#D90056',
        sunsetOrange: '#E25D33',
        goldenYellow: '#DFC45A',
        limeGreen: '#B8C42F',
        emeraldGreen: '#16AF6E',
        tealGreen: '#429488',
        forestGreen: '#397E49',
        skyBlue: '#439BDF',
        royalBlue: '#4254AF',
        lavenderBlue: '#6C7AC4',
        plumPurple: '#8332A4',
      },
      fonts: {
        font_family__sans: '"Roboto", sans-serif',
        font_family__secondary: '"Inter", sans-serif',
      },
    },
  },
  safelist: [
    ...Object.keys({
      rosePink: '#9F2957',
      deepPink: '#D90056',
      sunsetOrange: '#E25D33',
      goldenYellow: '#DFC45A',
      limeGreen: '#B8C42F',
      emeraldGreen: '#16AF6E',
      tealGreen: '#429488',
      forestGreen: '#397E49',
      skyBlue: '#439BDF',
      royalBlue: '#4254AF',
      lavenderBlue: '#6C7AC4',
      plumPurple: '#8332A4',
    }).flatMap((color) => [`bg-${color}`, `border-${color}`]),
  ],
  plugins: [],
};
