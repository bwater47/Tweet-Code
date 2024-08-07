import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  
  fontWeight: "normal", // change the font weight to normal
  fontFamily: "mono", // change the font family to monospaced
})

const sizes = {
  md: defineStyle({
    fontSize: "sm", // Change font size to sm (14px)
  }),
}

// Defining a custom variant
const colored = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    fontFamily: "sans-serif",
    bg: `palette.${c}`,
    fontWeight: "semibold",
    color: 'white',
    borderRadius: '3xl',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _dark: {
      bg: `pallete.dark${c}`,
      color: 'gray.800',
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
      }
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    colored: colored,
  },
  defaultProps: {
    colorScheme: "purple", // set the default color scheme to purple
  },
})