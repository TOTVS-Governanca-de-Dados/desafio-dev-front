module.exports = {
  // ...
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      darkMode: "class",
      animation: {
        bounce: "bounce 0.6s infinite",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: ("tailwind-scrollbar"),
};
