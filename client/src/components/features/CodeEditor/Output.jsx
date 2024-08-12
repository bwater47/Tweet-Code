import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { executeCode } from "../../../utils/api";
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const runCode = async () => {
    // Get the source code from the editor.
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <VStack height="100%" spacing={2}>
      <Button
        variant="outline"
        colorScheme="green"
        isLoading={isLoading}
        onClick={runCode}
        size="sm"
        width="100%"
      >
        Run Code
      </Button>
      <Box
        height="calc(100% - 32px)"
        width="100%"
        overflowY="auto"
        p={2}
        color={isError ? "red.400" : "white"}
        border="1px solid"
        borderRadius="md"
        borderColor="#333"
        bg="palette.grey"
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </VStack>
  );
};
Output.propTypes = {
  editorRef: PropTypes.shape({
    current: PropTypes.shape({
      getValue: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};
export default Output;
