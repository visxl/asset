/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"
  ,"node_modules/flowbite-react/lib/esm/**/*.js",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      'xxs': '375px',
      'sm': '750px',
      'md': '1200px'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),


  ]
}

