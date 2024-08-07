import { Outlet } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./styles/App.css";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    // <AuthProvider>
    <>
      <Header />
      <Outlet />
      <Box id="filler" bg='palette.darkgrey' ></Box>
      <Footer />
      </>
    // </AuthProvider>
  );
}

export default App;
