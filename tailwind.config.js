/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: '#ffffff1a',
        bg: '#170f23',
        sidebar: '#2a213a',
        purple: '#9b4de0',
        hover: '#c273ed',
        'player-bg': '#130c1c',
        'text-sidebar': '#dadada',
        'text-second': '#FFFFFF80',
        'active-sidebar': 'rgba(41,21,71,0.8)',
        'border-sidebar': '#9b4de0',
        'hover-player-bg': '#c273ed',
        'hover-chart-bg': 'hsla(0,0%,100%,0.3)',
        'text-chart-bg': 'hsla(0,0%,100%,0.1)',
      },

      gridTemplateColumns: {},
    },
  },
  plugins: [],
}
