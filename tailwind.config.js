/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(147deg, #bef5e4 0%, #16a04b 100%)',
      },
    },
  },
  plugins: [],
}
