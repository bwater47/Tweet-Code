
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROBLEM } from "../graphQL/queries.js";
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

const ProblemPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROBLEM, {
    variables: { _id: id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { problem } = data;

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradred, palette.darkgrey)"
    >
      <Box flex="1" overflowY="auto" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="xl" textAlign="center" color="palette.white">
              {problem.title}
            </Heading>
            <Box
              bg="palette.darkgrey"
              p={6}
              borderRadius="lg"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text mb={2} fontWeight="bold" color="palette.white">
                    Problem Information
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <Text color="palette.white">{problem.description}</Text>
                    <HStack>
                      <Text color="palette.white">Language:</Text>
                      <Text color="palette.cyan">
                        {problem.programmingLanguage}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text color="palette.white">Reward:</Text>
                      <Text color="palette.cyan">
                        {problem.coinReward} coins
                      </Text>
                    </HStack>
                    <TagDisplay tags={problem.tags} />
                  </VStack>
                </Box>

                <Divider borderColor="palette.lightgrey" />

                <Box>
                  <Text mb={2} fontWeight="bold" color="palette.white">
                    Code Block
                  </Text>
                  <Box height="69vh">
                    <CodeEditor
                      initialCode={problem.code}
                      initialLanguage={problem.programmingLanguage.toLowerCase()}
                      readOnly={true}
                    />
                  </Box>
                </Box>

                <Text color="palette.white">
                  Author: {problem.author.username}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default ProblemPage;
