import React, { useState } from "react";
import { VStack, Button, HStack } from "@chakra-ui/react";
import ProblemCard from "../common/problemCard.jsx";

const ProblemList = ({ problems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

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
        <ProblemCard key={problem.id} problem={problem} />
      ))}
      <HStack justifyContent="center" spacing={2}>
        {Array.from({
          length: Math.ceil(problems.length / problemsPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default ProblemList;
