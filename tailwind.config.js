const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(({ addVariant, matchUtilities, theme, addBase }) => {
      addBase({
        html: {
          height: "-webkit-fill-available !important",
        },
        body: {
          "min-height": "-webkit-fill-available !important",
        },
      });

      addVariant('search-cancel', '&::-webkit-search-cancel-button');

      matchUtilities(
        {
          direction: value => ({
            direction: value,
          }),
        },
        {
          values: {
            ltr: 'ltr',
            rtl: 'rtl',
            inherit: 'inherit',
            initial: 'initial',
            revert: 'revert',
            'revert-layer': 'revert-layer',
            unset: 'unset',
          },
        }
      );

      matchUtilities(
        {
          'letter-spacing': value => ({
            letterSpacing: value,
          }),
        },
        { values: theme('letterSpacing') }
      );
    }),
  ],
}
