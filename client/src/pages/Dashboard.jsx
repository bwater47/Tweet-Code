import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../graphQL/queries.js";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );

  const user = data?.user || {};

  return (
    <Box
      p={5}
      minHeight="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradpurple, palette.darkgrey)"
      color="white"
    >
      <VStack spacing={6} align="stretch">
        <Heading>My Dashboard</Heading>

        <Box borderWidth="1px" bg='palette.darkgrey' p={4} bgGradient="linear(palette.darkgrey, palette.grey)" boxShadow='4px 5px 10px 5px black' borderRadius={10} borderColor='palette.grey'>
          <Text color='palette.white'>
            <strong>Username:</strong> {user.username}
          </Text>
          <Text >
            <strong>Email:</strong> {user.email}
          </Text>
          <StatGroup>
            <Stat>
              <StatLabel>Coins</StatLabel>
              <StatNumber>{user.coins}</StatNumber>
            </Stat>
          </StatGroup>
        </Box>

        <Heading size="md">My Problems</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box p={3} shadow="md" borderWidth="1px" bg='palette.darkgrey' bgGradient="linear(palette.darkgrey, palette.grey)" boxShadow='4px 5px 10px 5px black' borderRadius={10} borderColor='palette.grey'>
            <Text>Problem placeholder</Text>
          </Box>
        </SimpleGrid>

        <Heading size="md">My Comments</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box p={3} shadow="md" borderWidth="1px" bg='palette.darkgrey'bgGradient="linear(palette.darkgrey, palette.grey)" boxShadow='4px 5px 10px 5px black' borderRadius={10} borderColor='palette.grey'>
            <Text>Comment placeholder</Text>
          </Box>
        </SimpleGrid>

        <Heading size="md">My Solutions</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box p={3} shadow="md" borderWidth="1px" bgGradient="linear(palette.darkgrey, palette.grey)" boxShadow='4px 5px 10px 5px black' borderRadius={10} borderColor='palette.grey'>
            <Text>Comment placeholder</Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
