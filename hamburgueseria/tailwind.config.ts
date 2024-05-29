import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      lightgrey: '#ECF0F1',
      darkblue: '#2C3E50',
      white: '#FFFFFF',
      dark: '#000000',
      black: '#000000',
      red: '#FF0000',
      yellow: '#FABC51',
      hoveredButton: '#BDC3C7',

    },
    extend: {


      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};
export default config;
