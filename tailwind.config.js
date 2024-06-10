/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark', 'nord'],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
