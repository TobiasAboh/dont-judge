/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondaryColour: "#B73D58",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
