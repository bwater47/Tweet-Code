import { useEffect, useState } from "react";
import { Box, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import theme from "../styles/theme.js";

const data = [
  {
    title: "Example Problem 1",
    description: "This is a description for problem 1.",
    tags: ["javascript", "react"],
    link: "/problem/1"
  },
  {
    title: "Example Problem 2",
    description: "This is a description for problem 2.",
    tags: ["nodejs", "express"],
    link: "/problem/2"
  },
  {
    title: "Example Problem 1",
    description: "This is a description for problem 1.",
    tags: ["javascript", "react"],
    link: "/problem/1"
  },
  {
    title: "Example Problem 2",
    description: "This is a description for problem 2.",
    tags: ["nodejs", "express"],
    link: "/problem/2"
  },
  {
    title: "Example Problem 1",
    description: "This is a description for problem 1.",
    tags: ["javascript", "react"],
    link: "/problem/1"
  },
  {
    title: "Example Problem 2",
    description: "This is a description for problem 2.",
    tags: ["nodejs", "express"],
    link: "/problem/2"
  },
  // Add more mock problems as needed
];

const SearchBar = ({ placeholder, w, p, _focus }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        // Using the Link component to navigate without opening a new tab
        window.location.href = searchData[selectedItem].link;
        setSearchData([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    if (search !== "") {
      const newFilterData = data.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      });
      setSearchData(newFilterData);
    } else {
      setSearchData([]);
    }
  }, [search]);

  return (
    <Box w={w} p={p} mx="auto" m="2" p="1" position="relative">
      <InputGroup>
        <Input
          type="text"
          bg={theme.colors.palette.white}
          placeholder={placeholder}
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          _focus={_focus}
        />
        <InputRightElement>
          {search === "" ? (
            <SearchIcon />
          ) : (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon textColor={theme.colors.palette.red}/>}
              onClick={handleClose}
              size="sm"
            />
          )}
        </InputRightElement>
      </InputGroup>
      {searchData.length > 0 && (
        <Box
          position="absolute"
          width="100%"
          mt={2}
          bg="palette.white" // The background color for the search results.
          borderRadius="md"
          boxShadow="md"
          zIndex="1"
        >
          {searchData.slice(0, 10).map((data, index) => (
            <Box
              key={index}
              as={Link}
              to={data.link}
              display="block"
              bg={selectedItem === index ? "palette.red" : "transparent"}
              borderRadius="md"
              p={2}
              onMouseEnter={() => setSelectedItem(index)}
              onMouseLeave={() => setSelectedItem(-1)}
            >
              {data.title}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
