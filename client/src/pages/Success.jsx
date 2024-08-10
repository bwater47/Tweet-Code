import { Box, Heading, Text, VStack, Icon, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import theme from "../styles/theme";

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

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
        // maxW="lg" // Increase the maxW value to make the box wider
        maxH="lg" // Increase the maxH value to make the box taller
        textAlign="center"
        width="50rem"
        overflow={"auto"}
      >
        <Icon as={CheckCircleIcon} w={16} h={16} color={theme.colors.palette.green} />
        <Heading color={theme.colors.palette.white} as="h1" size="xl">
          Payment Successful!
        </Heading>
        {sessionId && (
          <Text color={theme.colors.palette.white} fontSize="lg">
            Your session ID is: <strong>{sessionId}</strong>
          </Text>
        )}
        <Text color={theme.colors.palette.white} fontSize="md">
          Thank you for your donation. You can now live knowing your money is in a good place.
        </Text>
        <Button 
          colorScheme="teal" 
          bg={theme.colors.palette.white}
          _hover={{ bg: theme.colors.palette.white }}
          size="lg"
          color={theme.colors.palette.grey}
          onClick={() => window.location.replace('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </VStack>
    </Box>
  );
}

export default Success;

