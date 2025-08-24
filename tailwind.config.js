/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'left-[60px]',
    'md:left-1/2',
    'md:-translate-x-1/2',
    'text-[14px]',
    'md:text-[18px]',
    'lg:text-[18px]',
    'font-[700]',
    'text-[#594f43]',
    'absolute',
    'cursor-pointer'
  ]
}