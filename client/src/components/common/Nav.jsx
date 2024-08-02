import { Button, Flex,  Link,  } from "@chakra-ui/react";

const Nav = () => {

    return (
        <>
        <nav>
            <Flex alignContent='center' wrap="wrap"> 
                   

            <Link href="/" color="palette.white" p={4}>Home</Link>
            
            <Link href="/profile" color="palette.white" p={4}>Profile</Link>
            
            <Link href="#" color="palette.white" p={4}>Dashboard</Link>
            
            <Link href="#" color="palette.white" p={4}>Signup</Link>
            
            <Link href="#" color="palette.white" p={4}>Login/logout</Link>
                   
            <Button>this is a searchbar</Button>
            </Flex>

            
        </nav>
        </>
    );

};

export default Nav;