import {
  Box,
  Text,
  Avatar,
  VStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import SocialIcons from "../components/featurez/Developers/SocialIcons.jsx";

const devsData = [
  {
    id: 1,
    name: "Brennan Waterbury",
    description: "The Project Manager",
    avatar: "/images/BrennanW.jpg",
    social: {
      x: "https://x.com/Brennnn23",
      github: "https://github.com/bwater47",
      linkedin: "https://www.linkedin.com/in/brennan-waterbury/",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 2,
    name: "Aaron Bringhurst",
    description: "The Lead Developer",
    avatar: "",
    social: {
      x: "https://x.com/username",
      github: "https://github.com/AaronBringhurst",
      linkedin: "https://linkedin.com/in/username",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 3,
    name: "Jacob Toton",
    description: "The Assistant Project Manager",
    avatar: "/images/JacobT.jpg",
    social: {
      x: "https://x.com/username",
      github: "https://github.com/JToton",
      linkedin: "https://www.linkedin.com/in/jacobtoton/",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 4,
    name: "Charles Shumway",
    description: "The Senior Developer",
    avatar: "/images/CharlesS.jpg",
    social: {
      x: "https://x.com/username",
      github: "https://github.com/Ownerman123",
      linkedin: "https://www.linkedin.com/in/charles-shumway-5287b12ba/",
      youtube: "https://youtube.com/user/username",
    },
  },
  {
    id: 5,
    name: "David Pippin",
    description: "The Junior Developer",
    avatar: "/images/DavidP.jpg",
    social: {
      x: "https://x.com/username",
      github: "https://github.com/Dpippin09",
      linkedin: "https://www.linkedin.com/in/david-pippin-75516a174/",
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
          <Box
            key={dev.id}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            textAlign="center"
            maxW="280px"
            mx="auto"
          >
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
