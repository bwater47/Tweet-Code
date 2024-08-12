import { useRef, useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./Constants.jsx";
import Output from "./Output.jsx";
// Create a function that returns the CodeEditor component with the code snippet, language selector, and output.
const CodeEditor = ({
  onCodeChange,
  onLanguageChange,
  initialCode = "",
  initialLanguage = "javascript",
  readOnly = false,
}) => {
  // Create a reference to the editor.
  const editorRef = useRef(null);
  // Create state variables for the value, language, and editor readiness.
  const [value, setValue] = useState(
    // Use the initialCode or the code snippet for the initial value.
    initialCode || CODE_SNIPPETS[initialLanguage]
  );
  // Use the initialLanguage for the initial language state.
  const [language, setLanguage] = useState(initialLanguage);
  // Create a state variable to track if the editor is ready.
  const [isEditorReady, setIsEditorReady] = useState(false);
  // Create a function to handle the editor mount event.
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorReady(true);
  };
  // Create a function to handle the language selection.
  const onSelect = (lang) => {
    setLanguage(lang);
    if (!initialCode) {
      setValue(CODE_SNIPPETS[lang]);
    }
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };
  // Use the useEffect hook to call the onCodeChange callback when the value changes.
  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  }, [value, onCodeChange]);
  // Return the CodeEditor component.
  return (
    <VStack spacing={4} height="100%" width="100%">
      <LanguageSelector
        language={language}
        onSelect={onSelect}
        disabled={readOnly}
      />
      <HStack spacing={4} width="100%" height="calc(100% - 40px)">
        <Box
          width="50%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="#333"
        >
          <Editor
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              automaticLayout: true,
              readOnly: readOnly,
            }}
            height="100%"
            theme="vs-dark"
            language={language}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            onMount={onMount}
          />
        </Box>
        {isEditorReady && (
          <Box width="50%" height="100%">
            <Output editorRef={editorRef} language={language} />
          </Box>
        )}
      </HStack>
    </VStack>
  );
};
// Export the CodeEditor component.
export default CodeEditor;
