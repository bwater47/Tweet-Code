import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import LanguageSelector from "./LanguageSelector";
export default function CodeEditor() {
  const editorRef = useRef()
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (lang) => {
    setLanguage(lang);
  }
  return (
    <>
      <LanguageSelector language={language} onSelect={onSelect}/>
      <Editor
        height="75vh"
        theme="vs-dark"
        language={language}
        defaultValue="// Write your code here"
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </>
  );
}
