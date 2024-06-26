import type { Config } from "tailwindcss";
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
            "400":  "#83570B",
        },
        "customblue": {
            "600": "#033B55",
            "500": "#0E65A3",
            
        },
        "customoffwhite": {
            "500": "#FBFBFD",
    
            
        },
        "customtextblack": {
            "500": "#101010",
    
            
        },

      },
      animation: {
        backgroundPositionSpin: "background-position-spin 3000ms infinite alternate",
          ripple: "ripple 3400ms ease infinite",
          gradient: "gradient 8s linear infinite",
          shimmer: "shimmer 8s infinite",
          "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
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
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },

    },
  },
  plugins: [nextui()],
};
export default config;
