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
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../graphQL/queries.js";

const Dashboard = () => {
  const { loading, data, } = useQuery(QUERY_ME);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const user = data?.me || {};

  const ProblemModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="palette.darkgrey">
        <ModalHeader color="palette.white">My Problems</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {user.problems.map((problem) => (
              <ListItem key={problem._id} color="palette.white">
                <Text fontWeight="bold">{problem.title}</Text>
                <Text fontSize="sm">{problem.description}</Text>
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <Box
      p={5}
      minHeight="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradpurple, palette.darkgrey)"
      color="white"
    >
      <VStack spacing={6} align="stretch">
        <Heading>My Dashboard</Heading>

        <Box
          borderWidth="1px"
          bg="palette.darkgrey"
          p={4}
          bgGradient="linear(palette.darkgrey, palette.grey)"
          boxShadow="4px 5px 10px 5px black"
          borderRadius={10}
          borderColor="palette.grey"
        >
          <Text color="palette.white">
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

        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Box
            p={3}
            shadow="md"
            borderWidth="1px"
            bg="palette.darkgrey"
            bgGradient="linear(palette.darkgrey, palette.grey)"
            boxShadow="4px 5px 10px 5px black"
            borderRadius={10}
            borderColor="palette.grey"
          >
            <Heading size="md" mb={2}>
              My Problems
            </Heading>
            <Text>Total: {user.problems?.length || 0}</Text>
            <Button mt={2} colorScheme="purple" onClick={onOpen}>
              View All
            </Button>
          </Box>

          <Box
            p={3}
            shadow="md"
            borderWidth="1px"
            bg="palette.darkgrey"
            bgGradient="linear(palette.darkgrey, palette.grey)"
            boxShadow="4px 5px 10px 5px black"
            borderRadius={10}
            borderColor="palette.grey"
          >
            <Heading size="md" mb={2}>
              My Comments
            </Heading>
            <Text>Total: {user.comments?.length || 0}</Text>
          </Box>

          <Box
            p={3}
            shadow="md"
            borderWidth="1px"
            bg="palette.darkgrey"
            bgGradient="linear(palette.darkgrey, palette.grey)"
            boxShadow="4px 5px 10px 5px black"
            borderRadius={10}
            borderColor="palette.grey"
          >
            <Heading size="md" mb={2}>
              Donations
            </Heading>
            <Text>Total: {user.donationTransactions?.length || 0}</Text>
          </Box>
        </SimpleGrid>

        <Box
          p={3}
          shadow="md"
          borderWidth="1px"
          bg="palette.darkgrey"
          bgGradient="linear(palette.darkgrey, palette.grey)"
          boxShadow="4px 5px 10px 5px black"
          borderRadius={10}
          borderColor="palette.grey"
        >
          <Heading size="md" mb={2}>
            Recent Activity
          </Heading>
          <List spacing={3}>
            {[
              ...(user.problems || []),
              ...(user.comments || []),
              ...(user.donationTransactions || []),
            ]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((item, index) => (
                <ListItem key={index}>
                  <Text>
                    {item.title ||
                      item.content ||
                      `Donation on ${new Date(
                        item.purchaseDate
                      ).toLocaleDateString()}`}
                    <Badge
                      ml={2}
                      colorScheme={
                        item.title ? "green" : item.content ? "blue" : "purple"
                      }
                    >
                      {item.title
                        ? "Problem"
                        : item.content
                        ? "Comment"
                        : "Donation"}
                    </Badge>
                  </Text>
                </ListItem>
              ))}
          </List>
        </Box>
      </VStack>

      <ProblemModal />
    </Box>
  );
};

export default Dashboard;
