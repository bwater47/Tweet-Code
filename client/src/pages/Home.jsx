import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Show,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_PROBLEMS } from "../graphQL/queries";
import ProblemList from "../components/common/problemList.jsx";
import TagFilter from "../components/common/tagFilter.jsx";
import AdSpace from "../components/common/adSpace.jsx";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
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
  const filteredProblems = problems.filter(
    (problem) =>
      selectedTags.length === 0 ||
      problem.tags.some((tag) => selectedTags.includes(tag))
  );

  const allTags = Array.from(new Set(problems.flatMap((p) => p.tags)));

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
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
            <Box mt={6}>
              <AdSpace />
            </Box>
          </GridItem>
        </Grid>
      </Show>

      <Show below="sm">
        <Grid templateRows=" 1fr" gap={0}>
          <GridItem>
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
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
