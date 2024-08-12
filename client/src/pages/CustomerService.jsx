import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CustomerService = () => {
  const [email, setEmail] = useState("");
  const toast = useToast(); // For showing feedback messages.

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      // Here you would typically handle form submission, e.g., send the email to a server.
      // For now, we'll just show a success message.
      toast({
        title: "Email submitted.",
        description: `We have received your email: ${email}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
    } else {
      toast({
        title: "Error.",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      width="100vw"
      minH="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradyellow, palette.darkgrey)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxW="md"
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        bg="palette.lightgrey"
      >
        <Text fontSize="3xl" fontWeight="bold" color="white" mb={6}>
          Customer Service
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color="palette.white">Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                textColor="palette.black"
                placeholder="Enter your email"
                variant="filled"
                bg="palette.white"
              />
            </FormControl>
            <Button colorScheme="orange" type="submit" variant="solid">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CustomerService;
