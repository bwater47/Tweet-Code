import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Spacer, Input } from "@chakra-ui/react";

const NavHeader = ({ handlePageChange }) => {
  const location = useLocation();

  return (
    <Box
      as="nav"
      className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
    >
      <Flex>
        <Link
          to="/Post"
          className={
            location.pathname === "/Post"
              ? "nav-link active text-secondary"
              : "nav-link text-white"
          }
          onClick={() => handlePageChange("Post")}
        >
          Post
        </Link>
        <Link
          to="/Profile"
          className={
            location.pathname === "/Profile"
              ? "nav-link active text-secondary"
              : "nav-link text-white"
          }
          onClick={() => handlePageChange("Profile")}
        >
          Profile
        </Link>
        <Link
          to="/Register"
          className={
            location.pathname === "/Register"
              ? "nav-link active text-secondary"
              : "nav-link text-white"
          }
          onClick={() => handlePageChange("Register")}
        >
          Log in & Register
        </Link>
        <Spacer />
        <Input placeholder="Search" w="200px" />
      </Flex>
    </Box>
  );
};

export default NavHeader;
