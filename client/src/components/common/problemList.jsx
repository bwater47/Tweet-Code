import { useState } from "react";
import PropTypes from "prop-types";
import {
  VStack,
  Button,
  HStack,
  Box,
  Text,
  Badge,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaJs, FaPython, FaJava } from "react-icons/fa";
import { SiCsharpVersion, SiPhp, SiTypescript } from "react-icons/si";

const getLanguageIcon = (language) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return FaJs;
    case "python":
      return FaPython;
    case "java":
      return FaJava;
    case "csharp":
      return SiCsharpVersion;
    case "php":
      return SiPhp;
    case "typescript":
      return SiTypescript;
    default:
      return null;
  }
};

const getLanguageColor = (language) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return "yellow.400";
    case "python":
      return "blue.400";
    case "java":
      return "orange.400";
    case "csharp":
      return "purple.400";
    case "php":
      return "blue.600";
    case "typescript":
      return "blue.500";
    default:
      return "gray.400";
  }
};

const ProblemCard = ({ problem }) => {
  const LanguageIcon = getLanguageIcon(problem.programmingLanguage);
  const languageColor = getLanguageColor(problem.programmingLanguage);

  return (
    <Box
      p={5}
      shadow="md"
      borderRadius="xl"
      bg="palette.darkgrey"
      transition="all 0.5s"
      _hover={{
        boxShadow: "0 0 0 1px cyan",
        "& .hover-glow": {
          color: "cyan.300",
          textShadow: "0 0 2px cyan",
        },
      }}
    >
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" width="100%">
          <HStack spacing={4}>
            <Icon as={LanguageIcon} boxSize={8} color={languageColor} />
            <Link to={`/problem/${problem._id}`}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                className="hover-glow"
                transition="all 0.3s"
                color="white"
              >
                {problem.title}
              </Text>
            </Link>
          </HStack>
        </HStack>
        <Text className="hover-glow" transition="all 0.3s" color="white">
          {problem.description}
        </Text>
        <HStack justify="space-between" width="100%" spacing={3}>
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme="purple">{problem.programmingLanguage}</Badge>
            {problem.tags.map((tag, index) => (
              <Badge key={index} colorScheme="green">
                {tag}
              </Badge>
            ))}
          </HStack>
          <HStack spacing={3}>
            <Avatar
              size="lg"
              name={problem.author.username}
              src={problem.author.avatar || "https://bit.ly/broken-link"}
              transition="transform 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.20)",
              }}
            />
            <Text color="palette.orange" fontSize="md" fontWeight="medium">
              {problem.author.username}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

ProblemCard.propTypes = {
  problem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    programmingLanguage: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const ProblemList = ({ problems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 5;

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <VStack spacing={4} align="stretch">
      {currentProblems.map((problem) => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
      <HStack justifyContent="center" spacing={2}>
        {Array.from({
          length: Math.ceil(problems.length / problemsPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            variant={currentPage === index + 1 ? "currentpage" : "otherpages"}
            colorScheme={currentPage === index + 1 ? "yellow" : "purple"}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      programmingLanguage: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default ProblemList;
