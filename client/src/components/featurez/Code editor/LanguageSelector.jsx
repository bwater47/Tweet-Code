import React from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS } from "./Constants";

const Languages = Object.entries(LANGUAGE_VERSIONS);

export default function LanguageSelector({ language, onSelect }) {
  return (
    <Box w="72">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="full"
          textAlign="left"
          bg="white"
          shadow="md"
          _focus={{ outline: "none", borderColor: "indigo.500", boxShadow: "outline" }}
        >
          {language}
        </MenuButton>
        <MenuList maxH="60" overflowY="auto">
          {Languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              d="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{lang}</Text>
              <Flex alignItems="center">
                {lang === language && <CheckIcon color="amber.600" />}
                <Text ml="3" color="gray.400" fontSize="sm">
                  {version}
                </Text>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
