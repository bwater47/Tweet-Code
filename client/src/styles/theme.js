import { extendTheme } from "@chakra-ui/react";

// needs to go in its own folder for modularity and readability of code
const theme = extendTheme({
  colors: {
    palette: {
      white: "#FFFFFF",
      orange: "#FEA43C",
      red: "#F9213B",
      cyan: "#00FFFF",
      purple: "#7A52FF",
      yellow: "#ECFF77",
      green: "#36802A",
      grey: "#8B8C89",
      darkgrey: "#1f1f1f",
    },
  },
});

export default theme;