/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '976px',
        xlg: '1150px',
        xl: '1440px',
      },
      colors: {
        primary: '#000000',
        secondary: '#F8F9FA',
        white: '#FBFBFB',
        light: '#777777',
        gray: '#BDBDBD',
        success: '#14A44D',
        info: '#54B4D3',
        warning: '#E4A11B',
        error: '#FF3333',
        fontBlack: '#000000',
      },
      fontFamily: {
        nunito: ['Nunito'],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|secondary|white|light|gray|success|warning|error|info)/,
    },
  ],
};
