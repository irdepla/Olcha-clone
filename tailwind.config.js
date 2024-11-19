/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    screens: {
      tablet: "896px",
      desktop: "1152px",
    },
    extend: {
      colors: {
        primary: "#2D2D2D",
        "primary-light": "#fff",
        secondary: "#009379",
      },
      boxShadow: {
        "custom-shadow": "34.85px 29.63px 48.34px 0px #3366ff0d",
      },
    },
  },
  plugins: [],
};
