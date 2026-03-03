/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        accent: "#00f5c4",
        accentBlue: "#0099ff",
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #00f5c4, #0099ff)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
