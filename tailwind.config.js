/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,.12), 0 18px 60px rgba(15,23,42,.12)",
      },
    },
  },
  plugins: [],
};