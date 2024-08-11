// Import Box, Flex, Image, Link, Spacer, and Stack from Chakra UI.
import { Box, Flex, Image, Link, Spacer, Stack } from "@chakra-ui/react";
// Import the logo and brand images.
import logo from "../../assets/images/logo.svg";
import brand from "../../assets/images/brand.svg";
// Import the NavHeader component.
import NavHeader from "../common/NavHeader";
// Define the Header component.
const Header = () => {
  return (
    <>
      <header>
        <Flex
          w="100%"
          p={0}
          bg="palette.darkgrey"
          borderBottom="2px"
          borderColor="palette.grey"
        >
          <Link href="/">
            <Box>
              <Stack direction="row" spacing="5px">
                <Image src={logo} alt="Tweetcode Icon" width={100} minW={50} />
                <Image
                  src={brand}
                  alt="tweecode brand"
                  width={200}
                  height={100}
                  minW={100}
                ></Image>
              </Stack>
            </Box>
          </Link>
          <Spacer />
          <NavHeader />
        </Flex>
      </header>
    </>
  );
};
// Export the Header component.
export default Header;
