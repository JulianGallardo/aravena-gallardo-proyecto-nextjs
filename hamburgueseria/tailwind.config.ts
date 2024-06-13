import type { Config } from "tailwindcss";
import { z } from "zod";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkmodebg: '#252525',
        lightgrey: '#ECF0F1',
        darkblue: '#2C3E50',
        dark: '#000000',
        hoveredButton: '#BDC3C7',
  
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)',opacity: "0"},
          '100%': { transform: 'translateY(0)',opacity: "1"},
        },
        'slide-up': {
          '0%': { transform: 'translateY(0)', opacity: "1"},
          '100%': { transform: 'translateY(-100%)', opacity: "0"},
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-in forwards',
      },



      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
export default config;
