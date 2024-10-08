import {
  Box,
  Text,
  Avatar,
  VStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import theme from "../styles/theme.js";
import devsData from "../components/features/Developers/DevsData.jsx";
import SocialIcons from "../components/features/Developers/SocialIcons.jsx";
// Define the Devs component.
const Devs = () => {
  return (
    <Box
      bgGradient="linear(palette.darkgrey, palette.gradorange, palette.darkgrey)"
      maxW="100%"
      p={5}
    >
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={10}
        textColor={theme.colors.palette.white}
      >
        Meet our team
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 5 }}
        minChildWidth="280px"
        spacing={10}
      >
        {devsData.map((dev) => (
          <Box
            key={dev.id}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            borderColor={theme.colors.palette.lightgrey}
            textAlign="center"
            maxW="280px"
            minW="100px"
            mx="auto"
            bg={theme.colors.palette.lightgrey}
          >
            <VStack spacing={4}>
              <Avatar src={dev.avatar} size="2xl" name={dev.name} />
              <Text fontWeight="bold" textColor={theme.colors.palette.orange}>
                {dev.name}
              </Text>
              <Text fontSize="sm" textColor={theme.colors.palette.white}>
                {dev.description}
              </Text>
              <SocialIcons social={dev.social} />
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default Devs;
