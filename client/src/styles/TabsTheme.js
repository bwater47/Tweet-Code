import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // import utility for setting light and dark mode props

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  tab: {
    fontWeight: 'bold', // change the font weight
  },
  tabpanel: {
    fontFamily: 'mono', // change the font family
  },
});

// define custom sizes
const sizes = {
  xl: definePartsStyle({
    // define the parts that will change for each size
    tab: {
      fontSize: 'xl',
      py: '4',
      px: '6',
    },
    tabpanel: {
      py: '4',
      px: '6',
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

// define custom variants
const colorfulVariant = definePartsStyle(props => {
  const { colorScheme: c } = props; // add colorScheme as a prop

  return {
    tab: {
        border: 'none',
        borderBottom: '2px solid',
        borderColor: 'palette.lightgrey',
        textColor: mode('palette.white','palette.white')(props),
        color: 'palette.white',
      _selected: {
        bg: mode('palette.darkgrey', 'palette.darkgrey')(props),
        color: mode(`palette.${c}`, `palette.${c}`)(props),
        border: '2px solid',
        borderColor: 'palette.lightgrey',
        
        borderTopRadius: "10px",
        
      },
    },
    tablist: {
      borderBottom: '2x solid',
      borderColor: 'palette.lightgrey',
    },
    tabpanel: {
      border: '2px solid',
      borderColor: 'palette.lightgrey',
      borderBottomRadius: 'lg',
      borderTopRightRadius: 'lg',
    },
  };
});

const variants = {
  colorful: colorfulVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  size: 'xl',
  variant: 'colorful',
  colorScheme: 'green',
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});