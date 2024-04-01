import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      weather: ['var(--font-merri-weather)'],
      inter: ['var(--font-inter)'],
    },
  },
  content: [
    './node_modules/preline/preline.js',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
