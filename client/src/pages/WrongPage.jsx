import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WrongPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      p={4}
    >
      <Text fontSize="4xl" fontWeight="bold" color="red.500">
        404 - Page Not Found
      </Text>
      <Text fontSize="lg" color="gray.700" mb={4}>
        Sorry, the page you are looking for does not exist.
      </Text>
      <Button onClick={handleGoBack} colorScheme="blue">
        Go Back
      </Button>
    </Box>
  );
};

export default WrongPage;
