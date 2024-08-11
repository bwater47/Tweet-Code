import { useRef, useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./Constants.jsx";
import Output from "./Output.jsx";

const CodeEditor = ({
  onCodeChange,
  onLanguageChange,
  initialCode = "",
  initialLanguage = "javascript",
  readOnly = false,
}) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(
    initialCode || CODE_SNIPPETS[initialLanguage]
  );
  const [language, setLanguage] = useState(initialLanguage);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorReady(true);
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    if (!initialCode) {
      setValue(CODE_SNIPPETS[lang]);
    }
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  }, [value, onCodeChange]);

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

export default CodeEditor;
