// Import Box, Button, Menu, MenuButton, MenuItem, MenuList, and Text from Chakra UI.
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
// Import the LANGUAGE_VERSIONS constant from the Constants file.
import { LANGUAGE_VERSIONS } from "./Constants";
// Import PropTypes from prop-types.
import PropTypes from "prop-types";
// Create a languages variable to hold the entries of the LANGUAGE_VERSIONS object.
const languages = Object.entries(LANGUAGE_VERSIONS);
// Define the ACTIVE_COLOR constant.
const ACTIVE_COLOR = "blue.400";
// Define the LanguageSelector component.
const LanguageSelector = ({ language, onSelect }) => {
  // Add prop types validation.
  LanguageSelector.propTypes = {
    language: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };
  // Return the LanguageSelector component.
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu isLazy>
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
// Export the LanguageSelector component.
export default LanguageSelector;
