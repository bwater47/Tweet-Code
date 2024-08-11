// Import Box, Heading, Text, VStack, Icon, Button from Chakra UI.
import { Box, Heading, Text, VStack, Icon, Button } from "@chakra-ui/react";
// Import CheckCircleIcon from Chakra UI icons.
import { CheckCircleIcon } from "@chakra-ui/icons";
// Import useLocation from react-router-dom.
import { useLocation } from "react-router-dom";
// Import theme from the styles folder.
import theme from "../styles/theme";
// Define the Success component.
function Success() {
  // Call the useLocation hook to get the current location.
  const location = useLocation();
  // Create a new URLSearchParams object from the location search property.
  const queryParams = new URLSearchParams(location.search);
  // Get the session ID from the query parameters.
  const sessionId = queryParams.get("session_id");
  // Return the Success component.
  return (
    <Box
      minH="100vh"
      bgGradient="linear(palette.darkgrey, palette.gradgreen, palette.darkgrey)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        bg={theme.colors.palette.grey}
        p={12}
        borderRadius="md"
        boxShadow="lg"
        spacing={10}
        maxH="lg"
        textAlign="center"
        width="50rem"
        overflow={"auto"}
      >
        <Icon
          as={CheckCircleIcon}
          w={16}
          h={16}
          color={theme.colors.palette.green}
        />
        <Heading color={theme.colors.palette.white} as="h1" size="xl">
          Payment Successful!
        </Heading>
        {sessionId && (
          <Text color={theme.colors.palette.white} fontSize="lg">
            Your session ID is: <strong>{sessionId}</strong>
          </Text>
        )}
        <Text color={theme.colors.palette.white} fontSize="md">
          Thank you for your donation. You can now live knowing your money is in
          a good place.
        </Text>
        <Button
          colorScheme="teal"
          bg={theme.colors.palette.white}
          _hover={{ bg: theme.colors.palette.white }}
          size="lg"
          color={theme.colors.palette.grey}
          onClick={() => window.location.replace("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </VStack>
    </Box>
  );
}
// Export the Success component.
export default Success;
