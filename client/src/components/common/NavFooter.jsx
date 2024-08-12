import { Link } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import DonationButton from "../common/DonationButton.jsx";
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
export default NavFooter;
