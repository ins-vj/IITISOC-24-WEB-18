import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");
const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {

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


    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
