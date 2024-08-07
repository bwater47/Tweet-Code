import React from "react";
import { Box, Heading, Text, Tag, HStack, Icon } from "@chakra-ui/react";
import { FaJs, FaPython, FaJava, FaCode } from "react-icons/fa"; // We can import more icons as needed.

const languageIcons = {
  JavaScript: FaJs,
  Python: FaPython,
  Java: FaJava,
  // We can add more mappings as needed.
};

const ProblemCard = ({ problem }) => {
  const LanguageIcon = languageIcons[problem.primaryLanguage] || FaCode;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <HStack spacing={2} mb={2}>
        <Icon as={LanguageIcon} w={6} h={6} />
        <Heading size="md">{problem.title}</Heading>
      </HStack>
      <Text noOfLines={2} mb={2}>
        {problem.description}
      </Text>
      <HStack spacing={2}>
        {problem.tags.map((tag, index) => (
          <Tag key={index} size="sm">
            {tag}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default ProblemCard;