import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const NavFooter = () => {
  return (
    <Box
      as="footer"
      className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
    >
      <Flex>
        <Link to="/Developers" className="nav-link text-white">
          Contact / Developers
        </Link>
        <Link to="/FAQ" className="nav-link text-white">
          Common Questions
        </Link>
      </Flex>
    </Box>
  );
};

export default NavFooter;
