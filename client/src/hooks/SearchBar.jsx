// Import useEffect, useState from React.
import { useEffect, useState } from "react";
// Import Box, Input, InputGroup, InputRightElement, and IconButton from Chakra UI.
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
// Import the SearchIcon and CloseIcon from Chakra UI.
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
// Import Link from React Router.
import { Link } from "react-router-dom";
// Import useQuery from Apollo Client.
import { useQuery } from "@apollo/client";
// Import the GET_PROBLEM_TITLE query.
import { GET_PROBLEM_TITLE } from "../graphQL/queries";
// Import theme from the styles folder.
import theme from "../styles/theme.js";
// Search Bar component for searching problems by title.
const SearchBar = ({ placeholder, w, p, _focus }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  // Query to get all problems for searching by title.
  const { data } = useQuery(GET_PROBLEM_TITLE);
  // Function to handle changes in the search bar.
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // Function to handle closing the search bar.
  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };
  // Function to handle key down events in the search bar.
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
        window.location.href = searchData[selectedItem].link;
        setSearchData([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };
  // Use effect to filter problems by title.
  useEffect(() => {
    if (data && search !== "") {
      const newFilterData = data.problems.filter((problem) => {
        return problem.title.toLowerCase().includes(search.toLowerCase());
      });
      setSearchData(newFilterData);
    } else {
      setSearchData([]);
    }
  }, [search, data]);
  // Return the search bar component.
  return (
    <Box w={w} p={p} mx="auto" m="2" position="relative">
      {/* Search bar input */}
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
        {/* Search bar icons */}
        <InputRightElement>
          {search === "" ? (
            <SearchIcon />
          ) : (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon textColor={theme.colors.palette.red} />}
              onClick={handleClose}
              size="sm"
            />
          )}
        </InputRightElement>
      </InputGroup>
      {/* Search results */}
      {searchData.length > 0 && (
        <Box
          position="absolute"
          width="100%"
          mt={2}
          bg="palette.white"
          borderRadius="md"
          boxShadow="md"
          zIndex="1"
        >
          {/* Display search results */}
          {searchData.slice(0, 10).map((problem, index) => (
            <Box
              key={index}
              as={Link}
              to={`/problem/${problem._id}`}
              display="block"
              bg={selectedItem === index ? "palette.red" : "transparent"}
              borderRadius="md"
              p={2}
              onMouseEnter={() => setSelectedItem(index)}
              onMouseLeave={() => setSelectedItem(-1)}
            >
              {problem.title}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
// Export the SearchBar component.
export default SearchBar;
