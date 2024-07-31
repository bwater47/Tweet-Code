import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

export default function CodeEditor() {
  const editorRef = useRef()
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
  }

  return (
    <LanguageSelector language={language} onSelect={onSelect}/>
    <Editor
      height="75vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue="// Write your code here"
      onMount={onMount}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}
