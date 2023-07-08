/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          lignt: "#D8FF3D",
          DEFAULT: "#ccff00",
          medium: "#9DC302",
          mediumdark: "#0F2700",
          dark: "#001B03",
        },
      },
      fontFamily: {
        headline: "Open Sans, sans-serif", // font-headline
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
