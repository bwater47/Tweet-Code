
import { Box, Flex, Image, Link, Spacer, Stack } from '@chakra-ui/react';
import logo from '../../assets/images/logo.svg'
import brand from '../../assets/images/brand.svg'
import NavHeader from '../common/NavHeader';

const Header = () => {


    
    return (
        <>
        <header> 
            <Flex w="100%" p={0} bg ='palette.darkgrey'>
                <Link href='/'>
                    <Box >
                        <Stack direction='row' spacing='5px'>
                            <Image src={logo} alt='Tweetcode Icon' width={100} minW={50}/>
                            <Image src={brand} alt='tweecode brand' width={200}  height={100} minW={150}></Image>
                        </Stack>
                    </Box>
                </Link>
                <Spacer/>
                <NavHeader />
            </Flex>   
        </header>
        </>
    );

};

export default Header;