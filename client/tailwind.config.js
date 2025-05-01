// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        "bg-position": "bg-position 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "bg-position": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
};
