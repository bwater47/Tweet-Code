// This file will contain the API logic for the client-side.
// Import the axios library.
import axios from "axios";
// Import the language versions from the Constants file.
import { LANGUAGE_VERSIONS } from "../components/features/CodeEditor/Constants.jsx";
// Creates an instance of the axios client, and sets the base URL to the Piston API for the Code Editor.
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
// Export the executeCode function with the language and source code as arguments.
export const executeCode = async (language, sourceCode) => {
  // Make a POST request to the /execute endpoint with the language, version, and source code.
  const response = await API.post("/execute", {
    // Set the language to the selected language.
    language: language,
    // Set the version to the language version from the Constants file.
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

// Add the new submitCodeSnippet function.
export const submitCodeSnippet = async ({
  title,
  description,
  language,
  sourceCode,
}) => {
  const response = await API.post("/submit", {
    title,
    description,
    language,
    sourceCode,
  });
  return response.data;
};
// Export the API object.
export default API;
