import { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./Constants.jsx";
import Output from "./Output.jsx";

const CodeEditor = ({ onCodeChange }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorReady(true); // Editor is now ready
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  }, [value, onCodeChange]);

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        {isEditorReady && (
          <Output editorRef={editorRef} language={language} />
        )}
      </HStack>
    </Box>
  );
};

export default CodeEditor;
