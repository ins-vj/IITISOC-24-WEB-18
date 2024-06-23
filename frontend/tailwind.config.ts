import type { Config } from "tailwindcss";
const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      "colors":{ 
        "customorange": {
            "700": "#F86400",
            "600": "#F79500",
            "500": "#EBB652",
        },
        "customblue": {
            "600": "#033B55",
            "500": "#0E65A3",
            
        },
      },
      animation: {
        backgroundPositionSpin: "background-position-spin 3000ms infinite alternate",
          ripple: "ripple 3400ms ease infinite",
          gradient: "gradient 8s linear infinite",
          shimmer: "shimmer 8s infinite",
      },
      keyframes: {
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
      },

    },
  },
  plugins: [],
};
export default config;
