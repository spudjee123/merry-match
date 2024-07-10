/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-red-utility": "#AF2758",
        "color-red-100": "#FFE1EA",
        "color-red-500": "#C70039",
        "color-red-600": "#95002B",
        "color-gray-200": "#F1F2F6",
        "color-gray-400": "#D6D9E4",
        "color-gray-700": "#646D89",
        "color-gray-800": "#424C6B",
        "color-gray-900": "#2A2E3F",
        "color-purple-100": "#F4EBF2",
        "color-purple-500": "#A62D82",
        "color-purple-600": "#7D2262",
        "color-beige-700": "#7B4429",
      },
    },
  },
  plugins: [require("daisyui")],
};
