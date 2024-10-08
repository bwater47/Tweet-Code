import axios from "axios";
import { LANGUAGE_VERSIONS } from "../components/features/CodeEditor/Constants.jsx";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

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
export default API;
