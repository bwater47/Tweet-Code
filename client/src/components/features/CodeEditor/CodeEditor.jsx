import { useRef, useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./Constants.jsx";
import Output from "./Output.jsx";

const CodeEditor = ({ onCodeChange, onLanguageChange }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorReady(true);
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  }, [value, onCodeChange]);

  return (
    <VStack spacing={4} height="100%" width="100%">
      <LanguageSelector language={language} onSelect={onSelect} />
      <HStack spacing={4} width="100%" height="calc(100% - 40px)">
        {" "}
        {/* Adjust for LanguageSelector height */}
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
            }}
            height="100%"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
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

export default CodeEditor;
