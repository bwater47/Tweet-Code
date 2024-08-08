import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";
import CodeEditor from "../components/features/CodeEditor/CodeEditor.jsx";

const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION);

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [code, setCode] = useState("");
  const toast = useToast();
  const { isLoggedIn } = useAuth(); // Assuming useAuth provides isLoggedIn property
  
  
  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Authenticated",
        description: "You need to be logged in to create a post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!title || !summary || !code) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      const response = await request('http://localhost:3001/graphql', CREATE_POST_MUTATION, { title, summary, code });
      
      if (response.createPost.success) {
        toast({
          title: "Post created",
          description: "Your post has been successfully created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTitle("");
        setSummary("");
        setCode("");
      } else {
        throw new Error(response.createPost.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Create a New Post
      </Heading>
      <Box display="flex" flexDirection="column" maxWidth="800px" margin="auto">
        <Stack spacing={4} mb={4}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <Textarea
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            />
        </Stack>
        <CodeEditor onCodeChange={setCode} />
        <Button
          colorScheme="blue"
          mt={4}
          onClick={handleSubmit}
          isDisabled={!isLoggedIn} // Optional: Disable button if not logged in
          >
          Submit Post
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePost;


