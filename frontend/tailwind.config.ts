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
      scale: {
        '115': '1.15',
      },
      "colors":{ 
        "customorange": {
            "700": "#F86400",
            "600": "#F79500",
            "500": "#EBB652",
            "400":  "#83570B",
            "300": "#ffa319",
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
          rise: "rise 15s infinite ease-in-out forwards alternate-reverse",
        flip: 'flip 0.6s forwards',
        flipReverse: 'flipReverse 0.6s forwards',
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
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        flipReverse: {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0)' },
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
        "rise": {
          "0%": {
            transform: "translateY(2%) translateX(2%)",
          },
          "25%": {
            transform: "translateY(-2%) translateX(-2%)",
          },
          "75%": {
            transform: "translateY(2%) translateX(-2%)",
          },
          "100%": {
            transform: "translateY(-2%) translateX(2%)",
          },
        },
      },

    },
  },
  plugins: [nextui()],
};
export default config;
