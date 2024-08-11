// Import useState from React.
import { useState } from "react";
// Import PropTypes from prop-types.
import PropTypes from "prop-types";
// Import the Box, Button, Text, useToast, and VStack components from Chakra UI.
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
// Import the executeCode function from the API file.
import { executeCode } from "../../../utils/api";
// Define the Output component.
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // Define a function to run the code and display the output.
  const runCode = async () => {
    // Get the source code from the editor.
    const sourceCode = editorRef.current.getValue();
    // If there is no source code, return.
    if (!sourceCode) return;
    // Try block to execute the code.
    try {
      // Set the loading state to true.
      setIsLoading(true);
      // Call the executeCode function with the language and source code.
      const { run: result } = await executeCode(language, sourceCode);
      // Set the output state to the result output split by new lines.
      setOutput(result.output.split("\n"));
      // If there is an error, set the isError state to true.
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // Display a toast notification with the error message.
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
      // Set the output state to null.
    } finally {
      setIsLoading(false);
    }
  };
  // Return the Output component.
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
        height="calc(100% - 32px)" // Adjust for button height
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
// Define the prop types for the Output component.
Output.propTypes = {
  editorRef: PropTypes.shape({
    current: PropTypes.shape({
      getValue: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};
// Export the Output component.
export default Output;
