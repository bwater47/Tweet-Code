
import {
  Box,
  VStack,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spinner,
  Button,
  useDisclosure,
  List,
  ListItem,
  Badge,
  Alert,
  AlertIcon,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_PROBLEM, DELETE_COMMENT } from "../graphQL/mutations.js";
import { QUERY_ME } from "../graphQL/queries.js";
import { Link as RouterLink } from "react-router-dom";
import DonationModal from "../components/common/DonationModal";
import { UpdateProfile } from "../components/common/UpdateProfile";
import  Medals  from '../components/common/Medals.jsx'
import MedalShop from "../components/common/MedalShop.jsx";

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [deleteProblem] = useMutation(DELETE_PROBLEM);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [screenSmallerThan660] = useMediaQuery('(max-width: 660px')
  const toast = useToast();
  const {
    isOpen: isDonationModalOpen,
    onOpen: onDonationModalOpen,
    onClose: onDonationModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateProfileOpen,
    onOpen: onUpdateProfileOpen,
    onClose: onUpdateProfileClose,
  } = useDisclosure();


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
  const handleDeleteProblem = async (problemId) => {
    try {
      await deleteProblem({ variables: { id: problemId } });
      refetch();
      toast({
        title: "Problem deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error deleting problem",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({ variables: { id: commentId } });
      refetch();
      toast({
        title: "Comment deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error deleting comment",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          <VStack spacing={4} align="flex-start">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.avatar || "https://via.placeholder.com/150"}
              alt={`${user.username}'s avatar`}
              fallbackSrc="https://via.placeholder.com/150"
            />
            <Text color="palette.white">
              <strong>Username:</strong> {user.username}
            </Text>
            <Text>
              <strong>First Name:</strong> {user.firstName}
            </Text>
            <Text>
              <strong>Last Name:</strong> {user.lastName}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            <Button colorScheme="blue" onClick={onUpdateProfileOpen}>
              Update Profile
            </Button>
          </VStack>
          <Divider my={2} />
          <Text fontWeight="bold" mt={2}>
            Coins:
          </Text>
          <StatGroup>
            <Stat>
              <StatLabel>Coins</StatLabel>
              <StatNumber>{user.coins || 0}</StatNumber>
            </Stat>
          </StatGroup>
          <Divider my={2} />
          <Text fontWeight="bold" mt={2}>
            Donations:
          </Text>
          <Button mt={2} colorScheme="purple" onClick={onDonationModalOpen}>
            View Donations
          </Button>
          <Button
            mt={2}
            ml={2}
            colorScheme="green"
            as={RouterLink}
            to="/Donate"
          >
            Make a Donation
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
          <Tabs colorScheme="purple" size={screenSmallerThan660 ? 'sm' : 'xl'}>
            <TabList>
              <Tab  >Recent Activity</Tab>
              <Tab >My Problems</Tab>
              <Tab >My Comments</Tab>
              <Tab >Medals</Tab>
              <Tab >Shop</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                              item.title
                                ? "green"
                                : item.content
                                ? "blue"
                                : "purple"
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
              </TabPanel>
              <TabPanel>
                <Heading size="md" mb={2}>
                  My Problems
                </Heading>
                {user.problems && user.problems.length > 0 ? (
                  <List spacing={3}>
                    {user.problems.map((problem, index) => (
                      <ListItem key={index}>
                        <Text>{problem.title}</Text>
                        <Text fontSize="sm" color="gray.300">
                          {formatDate(problem.createdAt)}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          mt={1}
                          onClick={() => handleDeleteProblem(problem._id)}
                        >
                          Delete
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>No problems created yet.</Text>
                )}
              </TabPanel>
              <TabPanel>
                <Heading size="md" mb={2}>
                  My Comments
                </Heading>
                {user.comments && user.comments.length > 0 ? (
                  <List spacing={3}>
                    {user.comments.map((comment, index) => (
                      <ListItem key={index}>
                        <Text>{comment.content.substring(0, 50)}...</Text>
                        <Text fontSize="sm" color="gray.300">
                          {formatDate(comment.createdAt)}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          mt={1}
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>No comments made yet.</Text>
                )}
              </TabPanel>
              <TabPanel>
                <Heading size="md" mb={2}>Medals</Heading>
                <Medals userid={user._id}></Medals>
              </TabPanel>
              <TabPanel>
                <Heading size="md" mb={2}>Shop</Heading>
                <MedalShop userid={user._id} usercoins={user.coins}></MedalShop>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={onDonationModalClose}
        donations={user.donationTransactions || []}
      />

      <UpdateProfile
        isOpen={isUpdateProfileOpen}
        onClose={onUpdateProfileClose}
        user={user}
        refetch={refetch}
      />
    </Box>
  );
};

export default Dashboard;

