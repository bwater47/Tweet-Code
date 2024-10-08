import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const baseStyle = defineStyle({
  fontWeight: "normal",
  fontFamily: "mono",
});
const sizes = {
  md: defineStyle({
    fontSize: "sm",
  }),
};

const colored = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    bg: `palette.${c}`,
    fontWeight: "semibold",
    color: "white",
    borderRadius: "3xl",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    _dark: {
      bg: `pallete.dark${c}`,
      color: "gray.800",
    },

    _hover: {
      transform: "scale(1.01, 1.01)",
      bg: `palette.dark${c}`,

      _dark: {
        bg: `palette.dark${c}`,
      },
    },

    _active: {
      bg: `palette.dark${c}`,

      _dark: {
        bg: `palette.${c}`,
      },
    },
  };
});
const currentpage = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    borderColor: `palette.${c}`,
    bg: `palette.darkgrey`,
    borderWidth: "1px",
    boxShadow: "1px 1px 1px 1px ",
    fontWeight: "semibold",
    color: `palette.white`,
    borderRadius: "lg",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",

    _hover: {
      transform: "scale(1.02, 1.02)",
      borderColor: `palette.${c}`,
      color: `palette.${c}`,

      _dark: {
        bg: `palette.dark${c}`,
      },
    },

    _active: {
      bg: `palette.dark${c}`,

      _dark: {
        bg: `palette.${c}`,
      },
    },
  };
});
const otherpages = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    borderColor: `palette.${c}`,
    bg: `palette.darkgrey`,
    borderWidth: "1px",
    boxShadow: "1px 1px 1px 1px ",
    fontWeight: "semibold",
    color: "palette.white",
    borderRadius: "lg",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",

    _hover: {
      transform: "scale(1.02, 1.02)",
      borderColor: `palette.${c}`,
      color: `palette.${c}`,
    },

    _active: {
      bg: `palette.dark${c}`,

      _dark: {
        bg: `palette.${c}`,
      },
    },
  };
});
export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    colored: colored,
    currentpage: currentpage,
    otherpages: otherpages,
  },
  defaultProps: {
    colorScheme: "purple",
  },
});
