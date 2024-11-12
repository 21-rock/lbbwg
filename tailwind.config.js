/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      linearGradientColors: {
        'custom-gradient': ['#1fa2ff', '#12d8fa', '#a6ffcb'] // 自定义渐变颜色
      },
      linearGradientDirections: {
        'custom-direction': 'to right' // 自定义渐变方向
      },
      colors: {
        'gray-400': '#939393',
        'gray-100': '#f0f0f0',
        blue: '#0075ff'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
