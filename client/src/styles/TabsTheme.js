import { tabsAnatomy } from "@chakra-ui/anatomy"; // Import the tabs anatomy.
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"; // Import utility for setting light and dark mode props.

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// Define the base component styles.
const baseStyle = definePartsStyle({
  // Define the part you're going to style.
  tab: {
    fontWeight: "bold", // Change the font weight.
  },
  tabpanel: {
    fontFamily: "mono", // Change the font family.
  },
});

// Define custom sizes.
const sizes = {
  xl: definePartsStyle({
    // Define the parts that will change for each size.
    tab: {
      fontSize: "xl",
      py: "4",
      px: "6",
    },
    tabpanel: {
      py: "4",
      px: "6",
    },
  }),
  sm: definePartsStyle({
    tab: {
      fontSize: '10px',
      py: '1',
      px: '2',
    },
  })
};

// Define custom variants.
const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props; // Add colorScheme as a prop.

  return {
    tab: {
      border: "none",
      borderBottom: "2px solid",
      borderColor: "palette.lightgrey",
      textColor: mode("palette.white", "palette.white")(props),
      color: "palette.white",
      _selected: {
        bg: mode("palette.darkgrey", "palette.darkgrey")(props),
        color: mode(`palette.${c}`, `palette.${c}`)(props),
        border: "2px solid",
        borderColor: "palette.lightgrey",

        borderTopRadius: "10px",
      },
    },
    tablist: {
      borderBottom: "2x solid",
      borderColor: "palette.lightgrey",
    },
    tabpanel: {
      border: "2px solid",
      borderColor: "palette.lightgrey",
      borderBottomRadius: "lg",
      borderTopRightRadius: "lg",
    },
  };
});

const variants = {
  colorful: colorfulVariant,
};

// Define which sizes, variants, and color schemes are applied by default.
const defaultProps = {
  size: "xl",
  variant: "colorful",
  colorScheme: "green",
};

// Export the component theme.
export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});
