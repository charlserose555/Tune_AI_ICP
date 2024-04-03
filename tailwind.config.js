/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  purge: ["src/**/*.{js, jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'plus': ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
      width: {
        '65': '16.625rem',
        '69': '19.625rem',
        '26': '2.25rem',
        '30': '1.875rem',
      },
      height: {
        '27': '2.875rem',
        '26': '2.25rem',
        '30': '1.875rem'
      },
      gap: {
        '1': '0.25rem',
        '3': '0.75rem',
        '4': '1rem',
        '45' : '0.625rem',
        '8': '1.25rem'
      },
      padding: {
        '5': '1.25rem',
        '6': '1.5rem', // Your custom padding value
        '45': '0.625rem',
        '9': '2.5rem',
        '12': '3rem',
      },
      borderRadius: {
        '2': '0.25rem', // Your custom border radius value
        '4': '1rem',
        '5': '1.25rem',
        '8': '3rem'
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      },
      lineHeight: {
        '25': '25px',
        '18': '18px',
        '22': '22px',
        '20': '20px',
        '30': '30px'
      },
      fontSize: {
        '15': '24px',
        '22': '22px',
        '20': '20px', 
        '14': '14px',
        '16': '1rem',
        '18': '18px',
        '28': '28px'
      }
    },
    colors: {
      bcb_sidebar: "#1E1D1C",
      bcb_transparent: "#000000d6",
      primary: "#1C1B1B",
      secondary: "#50462A",
      background: "#161616",      
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09",
        1000: "#10100F",
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
      },
      primary: {
        100: "#F7F7F8",
        200: "#C6C5CC",
        300: "#95949F",
        400: "#656372",
        500: "#363443",
        600: "#2F2D3B",
        700: "#282733",
        800: "#21202A",
        900: "#1B1A22",
      },
      secondary: {
        100: "#F6F6F7",
        200: "#C1C1C5",
        300: "#8B8B92",
        400: "#575760",
        500: "#23232C",
        600: "#1F1F27",
        700: "#1A1A21",
        800: "#16161C",
        900: "#111116",
      },
      neutral: {
        100: "#FFFFFF",
        200: "#F2F2F2",
        300: "#E6E6E6",
        400: "#D9D9D9",
        500: "#CDCDCD",
        600: "#A4A4A4",
        700: "#7B7B7B",
        800: "#525252",
        900: "#292929",
      },
      blue: {
        100: "#E6F0FF",
        200: "#ACCFFF",
        300: "#79A8FF",
        400: "#3D83F7",
        500: "#0060D9",
        600: "#004FD0",
        700: "#003FB3",
        800: "#00308C",
        900: "#002166",
      }
    },
  },
  plugins: [require('tailwindcss')({ watch: true })],
  content: ["./node_modules/flowbite/**/*{.js, jsx}", "src/**/*.{js, jsx}"],
}

