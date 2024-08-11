import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROBLEM, QUERY_ME } from "../graphQL/queries.js";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Container,
  Flex,
  Divider,
} from "@chakra-ui/react";
import CodeEditor from "../components/features/CodeEditor/CodeEditor.jsx";
import TagDisplay from "../components/common/TagDisplay.jsx";
import CommentSection from "../components/common/CommentSection.jsx";

const ProblemPage = () => {
  // Extract the problem ID from the URL parameters
  const { id } = useParams();

  // Query to fetch the problem data
  const {
    loading: problemLoading,
    error: problemError,
    data: problemData,
  } = useQuery(GET_PROBLEM, {
    variables: { _id: id },
  });

  // Query to fetch the current user's data
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_ME);

  // Display loading state if either query is still loading
  if (problemLoading || userLoading) return <Text>Loading...</Text>;
  // Display error messages if either query encounters an error
  if (problemError) return <Text>Error: {problemError.message}</Text>;
  if (userError) return <Text>Error: {userError.message}</Text>;

  // Extract the problem and current user data from the query results
  const { problem } = problemData;
  const currentUser = userData?.me;

  return (
    // Main container with a gradient background
    <Flex
      direction="column"
      minHeight="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradred, palette.darkgrey)"
    >
      <Box flex="1" overflowY="auto" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            {/* Problem Section */}
            <Box
              bg="palette.darkgrey"
              p={6}
              borderRadius="lg"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <VStack spacing={6} align="stretch">
                {/* Problem Title */}
                <Heading
                  as="h1"
                  size="xl"
                  textAlign="center"
                  color="palette.white"
                >
                  {problem.title}
                </Heading>
                {/* Problem Information */}
                <Box>
                  <Text mb={2} fontWeight="bold" color="palette.white">
                    Problem Information
                  </Text>
                  <VStack spacing={4} align="stretch">
                    {/* Problem Description */}
                    <Text color="palette.white">{problem.description}</Text>
                    {/* Programming Language */}
                    <HStack>
                      <Text color="palette.white">Language:</Text>
                      <Text color="palette.cyan">
                        {problem.programmingLanguage}
                      </Text>
                    </HStack>
                    {/* Coin Reward */}
                    <HStack>
                      <Text color="palette.white">Reward:</Text>
                      <Text color="palette.cyan">
                        {problem.coinReward} coins
                      </Text>
                    </HStack>
                    {/* Problem Tags */}
                    <TagDisplay tags={problem.tags} />
                  </VStack>
                </Box>

                {/* Code Block */}
                <Box>
                  <Text mb={2} fontWeight="bold" color="palette.white">
                    Code Block
                  </Text>
                  <Box height="50vh">
                    <CodeEditor
                      initialCode={problem.code}
                      initialLanguage={problem.programmingLanguage.toLowerCase()}
                      readOnly={true}
                    />
                  </Box>
                </Box>

                {/* Problem Author */}
                <Text color="palette.white">
                  Author: {problem.author.username}
                </Text>
              </VStack>
            </Box>

            {/* Comments Section */}
            <Box
              bg="palette.darkgrey"
              p={6}
              borderRadius="lg"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Heading as="h2" size="lg" mb={4} color="palette.white">
                Comments
              </Heading>
              {/* Existing Comments */}
              <CommentSection
                problemId={problem._id}
                comments={problem.comments}
                isAuthor={problem.author._id === currentUser?._id}
                currentUserId={currentUser?._id}
                displayMode="existing"
              />
            </Box>

            {/* New Comment Section */}
            <Box
              bg="palette.darkgrey"
              p={6}
              borderRadius="lg"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Heading as="h2" size="lg" mb={4} color="palette.white">
                Add a New Comment
              </Heading>
              {/* New Comment Form */}
              <CommentSection
                problemId={problem._id}
                isAuthor={problem.author._id === currentUser?._id}
                currentUserId={currentUser?._id}
                displayMode="new"
              />
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default ProblemPage;
