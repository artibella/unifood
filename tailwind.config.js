/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js"
  ],
  safelist: [
    {
      pattern: /(grid)-(cols|rows)-./,
      variants: ['sm', 'md', 'lg', 'hover', 'group-hover']
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Source Serif Pro', 'serif'],
      }
    },
  },
  daisyui: {
    themes: [
      {
        ice: {
          "primary": "#272643",
          "secondary": "#2b6688",
          "accent": "#bae8e8",
          "neutral": "#e3f6f5",
          "base-100": "#FFFFFF",
          "info": "#e3f6f5",
          "success": "#bae8e8",
          "warning": "#fcd34d",
          "error": "#f43f5e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
