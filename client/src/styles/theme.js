import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./TabsTheme";
import { buttonTheme } from "./ButtonTheme";

// Define a theme that combines the custom components.
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
      darkgreen: "#20491C",
      lightgrey: "#383838",
      grey: "#1f1f1f",
      darkgrey: "#000000",
      gradorange: "#D38933",
      gradred: "#C31932",
      gradcyan: "#00CCCC",
      gradpurple: "#6342CC",
      gradyellow: "#B4CC60",
      gradgreen: "#2A6623",
      xhex: "#333333",
      linkedinhex: "#0077B5",
      githubhex: "#4183C4",
      youtubehex: "#FF0000",
    },
  },
  // Add the custom components to the theme.
  components: {
    Tabs: tabsTheme,
    Button: buttonTheme,
  },
});
// Export the theme.
export default theme;
