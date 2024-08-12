import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Show,
  IconButton,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_PROBLEMS } from "../graphQL/queries";
import ProblemList from "../components/common/problemList.jsx";
import AdSpace from "../components/common/adSpace.jsx";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import FilterAndSort from "../components/common/FilterAndSort.jsx";

const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("dateDesc");
  const { loading, error, data } = useQuery(GET_PROBLEMS);
  const navigate = useNavigate();
  const [fabPosition, setFabPosition] = useState("24px");

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCreateProblem = () => {
    navigate("/Post");
  };

  useEffect(() => {
    const updateFabPosition = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerHeight = footer.offsetHeight;
        setFabPosition(`${footerHeight + 24}px`);
      }
    };

    updateFabPosition();
    window.addEventListener("resize", updateFabPosition);

    return () => window.removeEventListener("resize", updateFabPosition);
  }, []);

  if (loading)
    return (
      <Text bg="palette.grey" textColor="palette.purple">
        Loading...
      </Text>
    );
  if (error)
    return (
      <Text bg="palette.grey" textColor="palette.purple">
        Error: {error.message}
      </Text>
    );

  const problems = data?.problems || [];
  const allTags = Array.from(new Set(problems.flatMap((p) => p.tags)));
  const allLanguages = Array.from(
    new Set(problems.map((p) => p.programmingLanguage))
  );

  let filteredProblems = problems.filter(
    (problem) =>
      (selectedTags.length === 0 ||
        problem.tags.some((tag) => selectedTags.includes(tag))) &&
      (selectedLanguage === "All" ||
        problem.programmingLanguage === selectedLanguage)
  );

  // Sort problems.
  filteredProblems.sort((a, b) => {
    switch (sortBy) {
      case "dateAsc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "dateDesc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "commentsAsc":
        return a.comments.length - b.comments.length;
      case "commentsDesc":
        return b.comments.length - a.comments.length;
      default:
        return 0;
    }
  });

  return (
    <Box
      bg="palette.grey"
      bgGradient="linear(palette.darkgrey, palette.gradyellow, palette.darkgrey)"
      p={5}
      position="relative"
      pb="100px"
    >
      <Text textColor="palette.purple" mb={4}></Text>
      <Show above="sm">
        <Grid templateColumns="3fr 1fr" gap={6}>
          <GridItem>
            <ProblemList problems={filteredProblems} />
          </GridItem>
          <GridItem>
            <Flex direction="column" alignItems="flex-start">
              <FilterAndSort
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
                languages={allLanguages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
              {/* Increased Space for dropdown menus */}
              <Box height="150px" mt={2} />
            </Flex>
            <Box mt={6}>
              <AdSpace />
            </Box>
          </GridItem>
        </Grid>
      </Show>

      <Show below="sm">
        <Grid templateRows="auto auto 1fr" gap={4}>
          <GridItem>
            <Flex direction="column" alignItems="center">
              <FilterAndSort
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
                languages={allLanguages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
              {/* Increased Space for dropdown menus */}
              <Box height="150px" mt={2} />
            </Flex>
          </GridItem>
          <GridItem>
            <ProblemList problems={filteredProblems} />
            <Box mt={6}>
              <AdSpace />
            </Box>
          </GridItem>
        </Grid>
      </Show>

      {/* Floating Action Button with Tooltip */}
      <Tooltip
        label="Post a new problem here"
        bg="palette.purple"
        color="white"
        fontSize="md"
        placement="left"
        hasArrow
      >
        <IconButton
          icon={<AddIcon boxSize={8} />}
          isRound={true}
          size="xl"
          bg="palette.red"
          color="white"
          position="fixed"
          bottom={fabPosition}
          right="8"
          onClick={handleCreateProblem}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          _hover={{
            bg: "palette.gradred",
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.4)",
          }}
          _active={{
            bg: "palette.gradred",
          }}
          transition="all 0.2s"
          aria-label="Create new problem"
          width="70px"
          height="70px"
          zIndex={1000}
        />
      </Tooltip>
    </Box>
  );
};

export default Home;
