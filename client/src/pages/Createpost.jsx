import { useState } from "react";
import { CREATE_PROBLEM } from "../graphQL/mutations";
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
import { useMutation } from "@apollo/client";
import CodeEditor from "../components/features/CodeEditor/CodeEditor.jsx";

function CreatePost() {
  const [createProblem, { loading, error }] = useMutation(CREATE_PROBLEM);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const toast = useToast();
  const { isLoggedIn } = useAuth();

  const handleLanguageChange = (language) => {
    setProgrammingLanguage(language);
  };

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
          programmingLanguage,
          code,
          tags: tags.split(",").map((tag) => tag.trim()), // Convert tags string to array
          coinReward: 0, // You might want to add a field for this or set a default
        },
      });

      if (data.createProblem) {
        toast({
          title: "Problem created",
          description: "Your problem has been successfully created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTitle("");
        setDescription("");
        setCode("");
        setTags("");
      } else {
        throw new Error("Failed to create problem");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to create problem. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Create a New Problem
      </Heading>
      <Box display="flex" flexDirection="column" maxWidth="800px" margin="auto">
        <Stack spacing={4} mb={4}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Stack>
        <CodeEditor
          onCodeChange={setCode}
          onLanguageChange={handleLanguageChange}
        />
        <Button
          colorScheme="blue"
          mt={4}
          onClick={handleSubmit}
          isLoading={loading}
          isDisabled={!isLoggedIn || loading}
        >
          Submit Problem
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePost;
