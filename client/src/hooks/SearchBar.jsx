import { useEffect, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROBLEM_TITLE } from "../graphQL/queries"; // Adjust the path as needed
import theme from "../styles/theme.js";

const SearchBar = ({ placeholder, w, p, _focus }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const { data } = useQuery(GET_PROBLEM_TITLE);

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
        window.location.href = searchData[selectedItem].link;
        setSearchData([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

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

  return (
    <Box w={w} p={p} mx="auto" m="2" position="relative">
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
              icon={<CloseIcon textColor={theme.colors.palette.red} />}
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
          bg="palette.white"
          borderRadius="md"
          boxShadow="md"
          zIndex="1"
        >
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

export default SearchBar;
