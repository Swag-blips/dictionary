/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Inter": ["inter", "sans-serif"],
        "Lora": ["lora", "sans-serif"],
        "inconsolata": ["inconsolata", "sans-serif"],
      },
    },
  },
  plugins: [],
};
