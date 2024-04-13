module.exports = {
  content: [
    "../../packages/ui/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#E1703B",
        },
      },
    ],
  }
};
