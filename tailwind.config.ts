import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#050505',
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F',
        },
        gold: {
          light: '#DFC15D',
          DEFAULT: '#C9A227',
          dark: '#9A7B1C',
        },
        cream: {
          DEFAULT: '#F5EFEB',
          muted: '#C4BDB7',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;