/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"
  ,"node_modules/flowbite-react/lib/esm/**/*.js",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      screens: {
        'xxs': '375px',
        md: '640px'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),


  ]
}

