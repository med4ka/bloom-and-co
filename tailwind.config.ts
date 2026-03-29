/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [],
};