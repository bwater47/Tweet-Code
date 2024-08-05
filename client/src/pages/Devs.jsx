import {
  Box,
  Flex,
  Text,
  Avatar,
  VStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import SocialIcons from "../components/featurez/Developers/SocialIcons.jsx"; // Adjust the path as needed

const devsData = [
  {
    id: 1,
    name: "Name Here",
    description:
      "There are many variations of passages of Lorem Ipsum available",
    avatar: "", // Add the URL of the image or keep it empty for a placeholder
    social: {
      x: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 2,
    name: "Name Here",
    description:
      "There are many variations of passages of Lorem Ipsum available",
    avatar: "",
    social: {
      x: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 3,
    name: "Name Here",
    description:
      "There are many variations of passages of Lorem Ipsum available",
    avatar: "",
    social: {
      x: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 4,
    name: "Name Here",
    description:
      "There are many variations of passages of Lorem Ipsum available",
    avatar: "",
    social: {
      x: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 5,
    name: "Name Here",
    description:
      "There are many variations of passages of Lorem Ipsum available",
    avatar: "",
    social: {
      x: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
];

const Devs = () => {
  return (
    <Box maxW="1300px" mx="auto" p={5}>
      <Heading as="h2" size="xl" textAlign="center" mb={10}>
        Meet our team
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={8}>
        {devsData.map((dev) => (
          <Box key={dev.id} p={6} borderWidth={1} borderRadius="lg" textAlign="center" maxW="280px" mx="auto">
            <VStack spacing={4}>
              <Avatar src={dev.avatar} size="2xl" name={dev.name} />
              <Text fontWeight="bold">{dev.name}</Text>
              <Text fontSize="sm" color="gray.500">
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
