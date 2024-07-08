/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-gray-400": "#D6D9E4",
        "color-gray-900": "#2A2E3F",
      },
    },
  },
  plugins: [require("daisyui")],
};
