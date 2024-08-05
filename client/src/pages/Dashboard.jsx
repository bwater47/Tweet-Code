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
import { QUERY_DASHBOARD_USER } from "../graphQl/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_DASHBOARD_USER);

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
      bgGradient="linear(to-br, blue.900, purple.900)"
      color="white"
    >
      <VStack spacing={6} align="stretch">
        <Heading>My Dashboard</Heading>

        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text>
            <strong>Username:</strong> {user.username}
          </Text>
          <Text>
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
          <Box p={3} shadow="md" borderWidth="1px">
            <Text>Problem placeholder</Text>
          </Box>
        </SimpleGrid>

        <Heading size="md">My Comments</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box p={3} shadow="md" borderWidth="1px">
            <Text>Comment placeholder</Text>
          </Box>
        </SimpleGrid>

        <Heading size="md">My Solutions</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box p={3} shadow="md" borderWidth="1px">
            <Text>Comment placeholder</Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
