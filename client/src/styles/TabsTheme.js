import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"; // Import utility for setting light and dark mode props.

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: "bold",
  },
  tabpanel: {
    fontFamily: "mono",
  },
});

const sizes = {
  xl: definePartsStyle({
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
      fontSize: "10px",
      py: "1",
      px: "2",
    },
  }),
};

const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props;

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

const defaultProps = {
  size: "xl",
  variant: "colorful",
  colorScheme: "green",
};

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});
