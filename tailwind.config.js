/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        abolition: ['"Abolition"', "sans-serif"],
        grotesk: ['"Lil Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
