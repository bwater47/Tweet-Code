// Import Link, RouterLink, and useNavigate from React Router.
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Import Box, Flex, Link, Menu, MenuButton, MenuList, MenuItem, Show, and IconButton from Chakra UI.
import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  IconButton,
} from "@chakra-ui/react";
// Import the HamburgerIcon from Chakra UI.
import { HamburgerIcon } from "@chakra-ui/icons";
// Import the useAuth hook from the hooks folder.
import { useAuth } from "../../hooks/useAuth.jsx";
// Import the SearchBar component from the hooks folder.
import SearchBar from "../../hooks/SearchBar.jsx";
// Define the NavHeader component.
const NavHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  // Define a function to handle the authentication action.
  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      // The logout function in AuthService handles redirection,
      // but you might want to use navigate here instead
      // navigate('/');
    } else {
      navigate("/registration");
    }
  };
  // Return the NavHeader component.
  return (
    <nav>
      {/* Show the search bar on larger screens. */}
      <Flex alignContent="center" height="100%">
        <Show above="sm">
          <Box height="100%" alignContent="center" mr={1}>
            <SearchBar
              placeholder="Search"
              w="200px"
              p={4}
              _focus={{ borderColor: "palette.cyan" }}
            />
          </Box>
        </Show>
        {/* Show the search bar on smaller screens. */}
        <Show below="sm">
          <Box height="100%" alignContent="center" mr={1}>
            <SearchBar placeholder="..." w="100px" p={1} />
          </Box>
        </Show>
        {/* Show the navigation links on larger screens. */}
        <Show above="lg">
          <Flex alignContent="center" height="100%" wrap="wrap" pr={1}>
            <Link
              as={RouterLink}
              to="/"
              color="palette.white"
              p={4}
              alignContent="center"
              _hover={{ color: "palette.purple" }}
            >
              Home
            </Link>

            <Link
              as={RouterLink}
              to="/Dashboard"
              color="palette.white"
              p={4}
              alignContent="center"
              _hover={{ color: "palette.red" }}
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
              _hover={{ color: "palette.orange" }}
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
                <MenuItem as={RouterLink} to="/Dashboard">
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
  );
};
// Export the NavHeader component.
export default NavHeader;
