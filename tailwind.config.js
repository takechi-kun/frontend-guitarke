module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
       '13': 'repeat(13, minmax(0, 1fr))',

      },
      margin: {
        '18': '4.5rem',
        '68': '17rem',
        '120': '30rem',
        '132': '33rem',
        '148': '37rem',
        '152': '38rem',
        '160': '40rem',
        '176': '44rem',
        '-13': '-3.25rem',
        '-15': '-3.75rem',
        '-68': '-17rem',
        '-100': '-25rem',
        '-108': '-27rem',
        '-112': '-28rem',
        '-116': '-29rem',
        '-120': '-30rem',
        '-160': '-40rem',
      },
      overflow: ["hover", "focus"],
      gridAutoFlow: ["hover", "focus"],
      textOpacity: ["active"],
      visibility: ["hover", "focus"],
      tableLayout: ["hover", "focus"],
      spacing: {
        81: "27rem",
        84: "28rem",
        90: "30rem",
        99: "33rem",
        105: "35rem",
        120: "40rem",
        135: "45rem",
        138: "46rem",
        141: "47rem",
        144: "48rem",
        147: "49rem",
        150: "50rem",
        162: "54rem",
        168: "56rem",
        180: "60rem",
      },
    },
  },
  screens: {},
  variants: {
    extend: {
      textColor: ['active'],
      margin: ["hover", "focus"],
      backgroundColor: ["active", "even", "odd"],
      maxWidth: ["hover", "focus"],
    },
  },
  plugins: [],
};
