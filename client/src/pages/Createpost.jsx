import { useState } from "react";
import{ CREATE_PROBLEM } from "../graphQL/mutations";
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

    
    function CreatePost() {
  const [createProblem, { loading, error }] = useMutation(CREATE_PROBLEM);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const toast = useToast();
  const { isLoggedIn } = useAuth(); 
  
  const handleLanguageChange = (Language) => {
    setLanguage(Language);
  }
  
  const handleSubmit = async (problemData) => {
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
    
    if (!title || !description || !code) {
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
      const { data } = await createProblem({ 
        variables: { 
          title,
          description,
          Language,
          code,
          tags,
        },
      });
      
      
      if (response.createPost.success) {
        toast({
          title: "Post created",
          description: "Your post has been successfully created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTitle("");
        setDescription("");
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
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
             
        </Stack>
        <CodeEditor onCodeChange={setCode}onLanguageChange={handleLanguageChange} />
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


