import { useState } from "react";
import { CREATE_PROBLEM } from "../graphQL/mutations";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
  VStack,
  Container,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import CodeEditor from "../components/features/CodeEditor/CodeEditor.jsx";
import TagDisplay from "../components/common/TagDisplay.jsx"; // Make sure to create this component in the correct directory

function CreatePost() {
  const [createProblem, { loading }] = useMutation(CREATE_PROBLEM);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const { isLoggedIn } = useAuth();

  const handleLanguageChange = (language) => {
    setProgrammingLanguage(language);
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    } else {
      setTagInput(value);
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    // Update the submit logic to use the tags array
    try {
      const { data } = await createProblem({
        variables: {
          title,
          description,
          programmingLanguage,
          code,
          tags,
          coinReward: 0,
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
        setTags([]);
        setTagInput("");
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

  const inputStyles = {
    bg: "palette.grey",
    color: "palette.white",
    _placeholder: { color: "palette.white" },
    borderColor: "palette.grey",
    _focus: {
      borderColor: "palette.cyan",
      boxShadow: "0 0 0 1px palette.cyan",
      _before: {
        content: "''",
        position: "absolute",
        top: "-2px",
        right: "-2px",
        bottom: "-2px",
        left: "-2px",
        background: "palette.cyan",
        opacity: 0.5,
        filter: "blur(4px)",
        zIndex: -1,
      },
    },
    transition: "all 0.3s ease-in-out",
  };

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradorange, palette.darkgrey)"
    >
      <Box flex="1" overflowY="auto" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="xl" textAlign="center" color="palette.white">
              Create a New Problem
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
                  <VStack spacing={4}>
                    <Input
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      {...inputStyles}
                    />
                    <Textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      {...inputStyles}
                    />
                    <Input
                      placeholder="Tags (press comma to add)"
                      value={tagInput}
                      onChange={handleTagInput}
                      {...inputStyles}
                    />
                    <TagDisplay tags={tags} onRemoveTag={handleRemoveTag} />
                  </VStack>
                </Box>

                <Divider borderColor="palette.lightgrey" />

                <Box>
                  <Text mb={2} fontWeight="bold" color="palette.white">
                    Code Block
                  </Text>
                  <Box height="69vh">
                    <CodeEditor
                      onCodeChange={setCode}
                      onLanguageChange={handleLanguageChange}
                    />
                  </Box>
                </Box>

                <Button
                  colorScheme="orange"
                  variant="colored"
                  onClick={handleSubmit}
                  isLoading={loading}
                  isDisabled={!isLoggedIn || loading}
                  size="lg"
                  width="full"
                >
                  Submit Problem
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}

export default CreatePost;
