/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7", 
        charcoal: "#2F302D", 
        sage: "#9EAD8C", 
        dustyRose: "#D29587", 
        sand: "#EFECE4", 
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        lora: ["var(--font-lora)", "serif"],
      },
    },
  },
  plugins: [],
};