/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redfundo: "#DC0A2D",
        bug: '#8CB230',
        dark: '#58575F',
        dragon: '#0F6AC0',
        electric: '#EED535',
        fairy: '#ED6EC7',
        fighting: '#D04164',
        fire: '#FD7D24',
        flying: '#748FC9',
        ghost: '#556AAE',
        grass: '#62B957',
        ground: '#DD7748',
        ice: '#61CEC0',
        normal: '#9DA0AA',
        poison: '#A552CC',
        psychic: '#EA5D60',
        rock: '#BAAB82',
        steel: '#417D9A',
        water: '#4A90DA',
      },
    },
  },
  plugins: [],
}