import { Link, useLocation } from "react-router-dom";
import { Box, Button, Flex,  Link, Menu, MenuButton, MenuList, MenuItem, Show, IconButton , Input } from "@chakra-ui/react";
import{HamburgerIcon} from '@chakra-ui/icons'

const NavHeader = ({ handlePageChange }) => {
  const location = useLocation();

  return (
  <>
    <nav>

        <Input placeholder="Search" w="200px" />
        <Show above="md">
        <Flex alignContent='bottom' height='100%' wrap="wrap"  pr={1}> 
        
        <Link href="/" color="palette.white" p={4} alignContent='center'>Home</Link>
        
        <Link href="/profile" color="palette.white" p={4} alignContent='center'>Profile</Link>
        
        <Link href="#" color="palette.white" p={4} alignContent='center'>Dashboard</Link>
        
        <Link href="#" color="palette.white" p={4} alignContent='center'>Signup</Link>
        
        <Link href="#" color="palette.white" p={4} alignContent='center'>Login/logout</Link>
             
        </Flex>
        </Show>
        <Show below="md">
            <Flex alignContent='center' height='100%' wrap="wrap"  pr={4}>
        <Menu p={4} alignContent='center'>
            <MenuButton as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon color="palette.white"/>}
                        variant='outline' 
                        alignContent='center'/>
            <MenuList>
                <MenuItem as='a' href='/'>
                    Home
                </MenuItem>
                <MenuItem as='a' href='/profile'>
                    Profile
                </MenuItem>
                <MenuItem as='a' href='#'>
                    Dashboard
                </MenuItem>
                <MenuItem as='a' href='#'>
                    Login/SignUp
                </MenuItem>
             </MenuList>
        </Menu>
            </Flex>
        </Show>

        
    </nav>
  </>
);
    
};

export default NavHeader;



