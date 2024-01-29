
import type { Config } from 'tailwindcss';
const {nextui} = require("@nextui-org/theme");
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
      // single component styles
      "./node_modules/@nextui-org/theme/dist/components/button.js", 
      // or you can use a glob pattern (multiple component styles)
      './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  plugins: [require('@tailwindcss/forms'),nextui()],
};
export default config;
