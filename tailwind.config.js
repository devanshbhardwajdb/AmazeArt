/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        livvic :  ['livvic'],
        metal: ["Metal Mania"],
        swash: ["Berkshire Swash"], 
        livvic: ["Livvic"], 
        noto: ["Noto Sans"],
      },
    },
  },
  plugins: [],
}
