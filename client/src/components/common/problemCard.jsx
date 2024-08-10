
import { Box, Heading, Text, Tag, HStack, Icon, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaJs, FaPython, FaJava, FaCode } from "react-icons/fa";

const languageIcons = {
  JavaScript: FaJs,
  Python: FaPython,
  Java: FaJava,
};



const ProblemCard = ({ problem }) => {
  const LanguageIcon = languageIcons[problem.programmingLanguage] || FaCode;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      maxW='75vw'
      bg="palette.darkgrey"
      borderColor="palette.grey"
      boxShadow="2px 0px 5px 2px "
    >
      <HStack spacing={2} mb={2}>
        <Icon as={LanguageIcon} w={6} h={6} color="palette.white" />
        <Link as={RouterLink} to={`/problem/${problem._id}`} maxWidth="90%">
          <Heading size="md" color="palette.white" maxWidth='100%' noOfLines={1}>
            {problem.title}
          </Heading>
        </Link>
      </HStack>
      <Text noOfLines={3} mb={2} color="palette.white" maxWidth='90%'>
        {problem.description}
      </Text>
      <HStack spacing={2}>
        {problem.tags.slice(0,5).map((tag, index) => (
          <Tag key={index} size="sm" >
            {tag.length > 15 ? tag.substring(0, 15) + '...' : tag.trim()}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default ProblemCard;
