// Import necessary components.
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";

// Define the CustomerService component.
const CustomerService = () => {
    // State to handle the email input.
    const [email, setEmail] = useState('');
    const toast = useToast(); // For showing feedback messages.

    // Handle form submission.
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
            setEmail(''); // Clear the input field.
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
            maxW="md"
            mx="auto"
            mt={8}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
        >
            <Text fontSize="2xl" mb={4}>Customer Service</Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit">Submit</Button>
                </Stack>
            </form>
        </Box>
    );
};

// Export the CustomerService component.
export default CustomerService;
