import React, { useState } from "react";
import { Grid, GridItem, Text, Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_PROBLEMS } from "../graphQL/queries";
import ProblemList from "../components/common/problemList.jsx";
import TagFilter from "../components/common/tagFilter.jsx";
import AdSpace from "../components/common/adSpace.jsx";

const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { loading, error, data } = useQuery(GET_PROBLEMS);

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

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

  const filteredProblems = data.problems.filter(
    (problem) =>
      selectedTags.length === 0 ||
      problem.tags.some((tag) => selectedTags.includes(tag))
  );

  const allTags = Array.from(new Set(data.problems.flatMap((p) => p.tags)));

  return (
    <Box bg="palette.grey" p={5}>
      <Text textColor="palette.purple" mb={4}>
        Welcome to TweetCode!
      </Text>
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
    </Box>
  );
};

export default Home;
