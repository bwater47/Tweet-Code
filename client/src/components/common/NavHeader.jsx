// import SearchBar from "../../hooks/SearchBar";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/useAuth.js";

const NavHeader = ({ handlePageChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      // The logout function in AuthService handles redirection.
    } else {
      navigate("/registration");
    }
  };

  return (
    <>
      <nav>
        <Flex alignContent="center" height="100%">
          <Show above="sm">
            <Box height="100%" alignContent="center" mr={1}>
              <Input placeholder="Search" w="200px" p={4} />
            </Box>
          </Show>

          <Show below="sm">
            <Box height="100%" alignContent="center" mr={1}>
              <Input placeholder="Search" w="100px" p={4} />
            </Box>
          </Show>

          <Show above="lg">
            <Flex alignContent="center" height="100%" wrap="wrap" pr={1}>
              <Link
                as={RouterLink}
                to="/"
                color="palette.white"
                p={4}
                alignContent="center"
              >
                Home
              </Link>

              <Link
                as={RouterLink}
                to="/profile"
                color="palette.white"
                p={4}
                alignContent="center"
              >
                Profile
              </Link>

              <Link
                as={RouterLink}
                to="#"
                color="palette.white"
                p={4}
                alignContent="center"
              >
                Dashboard
              </Link>

              <Link
                as={RouterLink}
                to="#"
                color="palette.white"
                p={4}
                alignContent="center"
                onClick={handleAuthAction}
              >
                {isLoggedIn ? "Logout" : "Login/Signup"}
              </Link>
            </Flex>
          </Show>

          <Show below="lg">
            <Flex alignContent="center" height="100%" wrap="wrap" pr={4}>
              <Menu p={4} alignContent="center">
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon color="palette.white" />}
                  variant="outline"
                  alignContent="center"
                />
                <MenuList>
                  <MenuItem as={RouterLink} to="/">
                    Home
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#">
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleAuthAction}>
                    {isLoggedIn ? "Logout" : "Login/SignUp"}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Show>
        </Flex>
      </nav>
    </>
  );
};

export default NavHeader;
