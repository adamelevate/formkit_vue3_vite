const formKitTailwind = require('@formkit/themes');

const defaultTheme = require('tailwindcss/defaultTheme')

const plugin = require('tailwindcss/plugin')




module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/assets/formtheme.js", "./formkit.config.js"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1536px',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
      }
    },
  },
  plugins: [
    formKitTailwind,
    {'tailwindcss/nesting': {},},
    require("@tailwindcss/typography"), 
    require('@tailwindcss/forms'),
    require('@formkit/themes'),
    
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],

};
