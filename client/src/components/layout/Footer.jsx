import SocialLinks from "../common/SocialLinks.jsx";
import NavFooter from "../common/NavFooter.jsx";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="black"
      color="white"
      borderTop="1px solid"
      borderColor="gray.600"
      py={4}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <NavFooter />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={4}
      >
        <SocialLinks /> 
        <Text fontSize="sm" mt={4}>
          © 2024 Tweet Code. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
