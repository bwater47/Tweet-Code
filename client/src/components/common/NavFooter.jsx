import { Link } from "react-router-dom";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaGlobe, FaDollarSign } from "react-icons/fa";

const NavFooter = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      bg="black"   // Set the background color to black
      color="white" // Set the text color to white
      p={3}         // Add some padding for better spacing
    >
      <Flex alignItems="center" mr={3}>
        <Icon as={FaGlobe} mr={1} />
        <Text as="span" mr={4}>
          English (US)
        </Text>
        <Icon as={FaDollarSign} mr={1} />
        <Text as="span">$ USD</Text>
      </Flex>
      <Box display="flex" flexWrap="wrap" alignItems="center">
        <Link to="/Developers" className="nav-link text-white">
          <Text as="span" mx={2}  _hover={{ color: "palette.purple" }}>
            Contact / Developers
          </Text>
        </Link>
        <Link to="/FAQ">
          <Text as="span" mx={2} _hover={{ color: "palette.red" }}>
            FAQ
          </Text>
        </Link>
        <Link to="/Support">
          <Text as="span" mx={2} _hover={{ color: "palette.cyan" }}>
            Support
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavFooter;


