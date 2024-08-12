// This component is a reusable filter and sort component that can be used in any page that uses filtering and sorting functionality.
import PropTypes from "prop-types";
import {
  Box,
  Select,
  Text,
  Collapse,
  Button,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import TagFilter from "./tagFilter";
const FilterAndSort = ({
  tags,
  selectedTags,
  onTagChange,
  languages,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const ref = useRef();
  const toast = useToast();
  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setIsOpen(!isOpen);
    } else {
      setActiveMenu(menu);
      setIsOpen(true);
    }
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
      setActiveMenu(null);
    }
  };
  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "commentsDesc" || value === "commentsAsc") {
      toast({
        title: "Silly, there's no comments to sort!",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      onSortChange(e);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const buttonStyles = {
    bg: "palette.darkgrey",
    color: "palette.white",
    borderColor: "palette.grey",
    borderWidth: "1px",
    _hover: {
      bg: "palette.darkgrey",
      boxShadow: "0 0 10px 2px palette.cyan",
      borderColor: "palette.cyan",
      color: "palette.cyan",
    },
    _active: {
      bg: "palette.darkgrey",
    },
    transition: "all 0.2s",
  };
  const selectStyles = {
    bg: "black",
    color: "palette.white",
    borderColor: "palette.grey",
    _hover: {
      borderColor: "palette.cyan",
    },
    _focus: {
      borderColor: "palette.cyan",
      boxShadow: "0 0 0 1px palette.cyan",
    },
    sx: {
      "> option": {
        bg: "black",
      },
    },
  };
  return (
    <Box ref={ref} width="100%">
      <HStack spacing={4} justifyContent="center" mb={4}>
        <Button
          onClick={() => toggleMenu("filter")}
          rightIcon={
            isOpen && activeMenu === "filter" ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )
          }
          {...buttonStyles}
        >
          Filter by
        </Button>
        <Button
          onClick={() => toggleMenu("sort")}
          rightIcon={
            isOpen && activeMenu === "sort" ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )
          }
          {...buttonStyles}
        >
          Sort by
        </Button>
      </HStack>

      <Box minHeight="150px" position="relative" width="100%">
        <Collapse in={isOpen && activeMenu === "filter"} animateOpacity>
          <VStack
            spacing={4}
            align="stretch"
            bg="palette.grey"
            p={4}
            borderRadius="md"
            width="100%"
          >
            <Box>
              <Text mb={1} color="palette.white">
                Programming Language
              </Text>
              <Select
                value={selectedLanguage}
                onChange={onLanguageChange}
                {...selectStyles}
              >
                <option value="All">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <Text mb={1} color="palette.white">
                Tags
              </Text>
              <TagFilter
                tags={tags}
                selectedTags={selectedTags}
                onTagChange={onTagChange}
              />
            </Box>
          </VStack>
        </Collapse>

        <Collapse in={isOpen && activeMenu === "sort"} animateOpacity>
          <Box bg="palette.grey" p={4} borderRadius="md" width="100%">
            <Select
              value={sortBy}
              onChange={handleSortChange}
              {...selectStyles}
            >
              <option value="dateDesc">Newest</option>
              <option value="dateAsc">Oldest</option>
              <option value="commentsDesc">Most Comments</option>
              <option value="commentsAsc">Least Comments</option>
            </Select>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
FilterAndSort.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagChange: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf([
    "dateDesc",
    "dateAsc",
    "commentsDesc",
    "commentsAsc",
  ]).isRequired,
  onSortChange: PropTypes.func.isRequired,
};
export default FilterAndSort;
