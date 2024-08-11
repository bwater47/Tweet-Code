// Import useState from React.
import { useState } from "react";
// Import the Box, Button, Flex, Textarea, Avatar, Text, VStack, and HStack components from Chakra UI.
import {
  Box,
  Button,
  Flex,
  Textarea,
  Avatar,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
// Import the Medals component from the common folder.
import Medals from "../components/common/Medals.jsx";
// Define the commentsData array.
const commentsData = [
  {
    id: 1,
    username: "Ralph Edwards",
    date: "Aug 19, 2021",
    text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.",
    avatar: "https://bit.ly/dan-abramov",
  },
  // Add more comments as needed.
];
const ViewPost = () => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");
  const handlePostComment = () => {
    const newCommentData = {
      id: comments.length + 1,
      username: "Your Username", // Replace with actual username.
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      text: newComment,
      avatar: "https://bit.ly/dan-abramov", // Replace with actual avatar URL.
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };
  return (
    <Box
      bgGradient="linear(palette.darkgrey, palette.gradred, palette.darkgrey)"
      maxW="600px"
      mx="auto"
      mt={10}
      p={5}
      borderWidth={1}
      borderRadius="lg"
    >
      <Flex alignItems="center" mb={4}>
        <Avatar src="https://bit.ly/dan-abramov" size="md" mr={3} />
        <Textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          size="sm"
          resize="none"
        />
        <Button ml={2} colorScheme="blue" onClick={handlePostComment}>
          Post
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {comments.map((comment) => (
          <Box key={comment.id} p={4} borderWidth={1} borderRadius="lg">
            <HStack alignItems="center" mb={2}>
              <Avatar src={comment.avatar} size="sm" />
              <Box ml={3}>
                <HStack>
                  <Text fontWeight="bold">{comment.username}</Text>
                  <Medals userid="66b64c6a2c5d6b636e60c493" />
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {comment.date}
                </Text>
              </Box>
            </HStack>
            <Text>{comment.text}</Text>
          </Box>
        ))}
      </VStack>
      <Button variant="link" mt={4}>
        See 10 more comments
      </Button>
    </Box>
  );
};
// Export the ViewPost component.
export default ViewPost;
