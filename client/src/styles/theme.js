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
      grey: "#1f1f1f",
      darkgrey: "#000000",
      gradorange: "#D38933",
      gradred: "#C31932",
      gradcyan: "#00CCCC",
      gradpurple: "#6342CC",
      gradyellow: "#B4CC60",
      gradgreen: "#2A6623",
      
    },
  },
});

export default theme;