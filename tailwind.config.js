/** @type {import('tailwindcss').Config} */
import { SCREENS } from './responsive';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: SCREENS,
  },
  plugins: [],
};
