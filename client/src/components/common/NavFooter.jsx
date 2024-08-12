// Import Link from React Router for navigation.
import { Link } from "react-router-dom";
// Import Box, Flex, Heading, and Text from Chakra UI.
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
// Import the DonationButton component.
import DonationButton from "../common/DonationButton.jsx";
// Define the NavFooter component.
const NavFooter = () => {
  return (
    <Box
      as="nav"
      className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
    >
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Box display="flex" flexDirection="column" mr={3} p={3} pt={6}>
          <Heading as="h3" size="md">
            Developers
          </Heading>
          <Link to="/Developers" className="nav-link text-white">
            <Text _hover={{ color: "palette.purple" }}>
              Contact / Developers
            </Text>
          </Link>
        </Box>
        <Box display="block" mr={3} p={3} pt={6}>
          <Heading as="h3" size="md">
            FAQ
          </Heading>
          <Link to="/FAQ" className="nav-link text-white">
            <Text _hover={{ color: "palette.red" }}>Common Questions</Text>
          </Link>
        </Box>
        <Box display="block" mr={3} p={3} pt={6}>
          <Heading as="h3" size="md">
            Support
          </Heading>
          <Link to="/Support" className="nav-link text-white">
            <Text _hover={{ color: "palette.blue" }}>Customer Service</Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
// Export the NavFooter component.
export default NavFooter;
