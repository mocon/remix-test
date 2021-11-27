module.exports = {
  // mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: { sans: 'Karelia' },
      tableLayout: ['hover', 'focus'],
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
}
