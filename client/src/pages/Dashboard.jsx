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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../graphQL/queries.js";

const ProblemModal = ({ isOpen, onClose, problems }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent bg="palette.darkgrey">
      <ModalHeader color="palette.white">My Problems</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <List spacing={3}>
          {problems.map((problem) => (
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

ProblemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("QUERY_ME data:", data);

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

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading dashboard: {error.message}
      </Alert>
    );

  const user = data?.me || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const recentActivity = [
    ...(user.problems || []),
    ...(user.comments || []),
    ...(user.donationTransactions || []),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.purchaseDate) -
        new Date(a.createdAt || a.purchaseDate)
    )
    .slice(0, 5);

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
              <StatNumber>{user.coins || 0}</StatNumber>
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
            <Button
              mt={2}
              colorScheme="purple"
              onClick={onOpen}
              isDisabled={!user.problems?.length}
            >
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
          {recentActivity.length > 0 ? (
            <List spacing={3}>
              {recentActivity.map((item, index) => (
                <ListItem key={index}>
                  <Text>
                    {item.title ||
                      item.content ||
                      `Donation on ${formatDate(item.purchaseDate)}`}
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
                  <Text fontSize="sm" color="gray.300">
                    {formatDate(item.createdAt || item.purchaseDate)}
                  </Text>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No recent activity to display.</Text>
          )}
        </Box>
      </VStack>

      <ProblemModal
        isOpen={isOpen}
        onClose={onClose}
        problems={user.problems || []}
      />
    </Box>
  );
};

export default Dashboard;
