import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
// import { useAuth } from "../../hooks/useAuth.jsx";
import Auth from "../../hooks/AuthService.js";
import SearchBar from "../../hooks/SearchBar.jsx";
const token = Auth.getToken();
const NavHeader = ({ handlePageChange }) => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const { isLoggedIn, logout } = useAuth();

  const handleAuthAction = () => {
    if (token.isLoggedIn()) {
      token.logout();
      // The logout function in AuthService handles redirection.
    } else {
      navigate("/registration");
    }
  };

  return (
    <>
      <nav>
        <Flex alignContent="center" height="100%" >
          <Show above="sm">
            <Box height="100%" alignContent="center" mr={1}>
              <SearchBar placeholder="Search" w="200px" p={4}  _focus={{borderColor: 'palette.cyan'}}/>
            </Box>
          </Show>

          <Show below="sm">
            <Box height="100%" alignContent="center" mr={1}>
            <SearchBar placeholder="..." w="100px" p={1}/>
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
                _hover={{color: 'palette.purple'}}
              >
                Home
              </Link>

              <Link
                as={RouterLink}
                to="/Dashboard"
                color="palette.white"
                p={4}
                alignContent="center"
                _hover={{color: 'palette.red'}}
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
                _hover={{color: 'palette.orange'}}
              >
                {Auth.loggedIn() ? "Logout" : "Login/Signup"}
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
                    {Auth.loggedIn() ? "Logout" : "Login/SignUp"}
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
