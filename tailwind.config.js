// tailwind.config.js

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/hooks/**/*.{js,ts}",
    "./src/libraries/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/games/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./stories/**/*.{js,vue,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient":
          "radial-gradient(79.44% 190.83% at 47.12% 105.83%, #4affd4 0%, #008976 100%)",
        "primary-gradient-2":
          "radial-gradient(circle at 47% 106%, #4affd4,#008976 21%)",
        "primary-hover-gradient":
          "radial-gradient(79.44% 190.83% at 47.12% 105.83%,#97ffe6 0%, #0abca3 100%)",
        "third-gradient":
          "radial-gradient(64.23% 101.67% at 47.73% 94.17%,#ffdb41 0%, #f0b91e)",
        "third-hover-gradient":
          "radial-gradient(64.23% 101.67% at 47.73% 94.17%, #fae175 0%, #ffd04b 100%)",
        "secondary-gradient":
          "linear-gradient(180deg, #343a47 0%, #2c3140 100%)",
        "secondary-hover-gradient":
          "linear-gradient(180deg, #434b5b 0%, #33394a 100%)",
        "danger-gradient":
          "radial-gradient(776.29% 137.75% at -64.15% 71.86%,#f96868 0%,#f80000 100% )",
        "danger-hover-gradient":
          "radial-gradient(776.29% 137.75% at -64.15% 71.86%, #ff8484 0%, #f01919 100% )",
        "rect-border-gradient":
          "linear-gradient(180deg,#2a2e39 0%,rgba(33, 37, 48, 1) 15%,rgba(33, 37, 48, 1) 100%);",
        "static-input-gradient":
          "linear-gradient(180deg, #343A47 0%, #2C3140 100%), #212530;",
        "progress-bar-gradient":
          "linear-gradient(180deg, #343A47 0%, rgba(44, 49, 64, 0.00) 100%);",
      },
      boxShadow: {
        "primary-box": "0 6.2px 18.5px 0 rgba(54, 190, 6, 0.11)",
        "third-box": "0 6.2px 18.5px 0 rgba(242, 190, 35, 0.11)",
        "secondary-box": "0 7.5px 31.1px 0 rgba(0, 0, 0, 0)",
        "dark-box": "inset 0 4px 4px 0 rgba(0, 0, 0, 0.08)",
        "steel-box": "inset 0 4px 6px rgba(0, 0, 0, 0.25)",
        "progress-box": "0px 6.1792px 18.5376px rgba(54, 190, 6, 0.11)",
        "radio-box": "0px 5.08929px 15.2679px rgba(54, 190, 6, 0.11)",
        popover: "0px 4px 4px rgba(0, 0, 0, 0.07)",
        "primary-inset": "inset 0px 2px 4px #67FDE2",
        "secondary-inset": "inset 0px 2px 4px #3F4655",
        sidebar: "0px 0px 19px rgba(0,0,0,0.2)",
        notification: "0px 3.04545px 8.375px rgba(0, 0, 0, 0.27);",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.4, 0, 0.23, 1)",
      },
      fontSize: {
        xxs: ["0.625rem", "0.75rem"], // 10px 12px
        xs: ["0.75rem", "0.9375rem"], // 12px, 15px
        sm: ["0.875rem", "1.0625rem"], // 14px, 17px
        base: ["1rem", "1.1875rem"], // 16px, 19px
        lg: ["1.125rem", "1.375rem"], // 18px, 22px
        xxl: ["1.75rem", "2.125rem"], // 28px, 34px
      },
      borderRadius: {
        lg: "0.625rem", // 10px
        md: "0.4375rem", // 7px
        sm: "0.3125rem", // 5px
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        lxl: "1198px",
        xl: "1368px",
        xxl: "1440px",
        mouse: { raw: "(hover: hover)" },
      },
      maxWidth: {
        content: "1360px",
      },
      minWidth: {
        button: "170px",
      },
    },
    colors: {
      transparent: "transparent",
      "primary-color": "#67fde2",
      "primary-hover-color": "#91ffeb",
      "third-color": "#ffdb95",
      "third-hover-color": "#ffe1a8",
      "secondary-color": "#3f4655",
      "secondary-hover-color": "#485061",
      "danger-color": "rgba(255, 255, 255, 0.44)",
      "danger-hover-color": "rgba(255, 255, 255, 0.32)",
      "dark-color": "#1c202c",
      "black-russian-color": "#171b23",
      "slate-color": "#7c8497",
      "steel-color": "#858da0",
      "ronil-color": "#00af96",
      "dark-grey-color": "rgba(33, 37, 48, 0.6)",
      "midnight-express-color": "#272a33",
      "ebony-clay-color": "#212530",
      "ebony-color": "#2a2e39",
      "concrete-gray-grey-color": "#f3f3f3",
      "cloud-burst-color": "rgba(55, 60, 71, 0.53)",
      error: "#F64747",
      white: "#fff",
      black: "#000",
      "green-color": "#3CD3AF",
      ash: "#343A47", // colors for border and menu hover, etc...
      "menu-active": "#1C202C", // colors for border and menu hover, etc...
      turquoise: "#47EEA0",
      divider: "#2e3442",
    },
    fontFamily: {
      proximanova: ["proxima-nova", "sans-serif"],
      sans: ["proxima-nova", "sans-serif"], // To apply default font across global
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-only-y": (value) => ({
            "--tw-translate-y": value,
            transform: `translateY(var(--tw-translate-y)) translateZ(0)`,
          }),
        },
        { values: theme("translate"), supportsNegativeValues: true }
      );
    }),
  ],
};
