// Import Outlet from react-router-dom to render child routes.
import { Outlet } from "react-router-dom";
// Import AuthProvider from useAuth.jsx.
import { AuthProvider } from "./hooks/useAuth.jsx";
// Import Header and Footer components.
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// Import CSS file.
import "./styles/App.css";
// Import Chakra UI Box component.
import { Box } from "@chakra-ui/react";
// Creates a function that returns the layout of the app.
function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <Outlet />
        <Box id="filler" bg="palette.darkgrey"></Box>
        <Footer />
      </>
    </AuthProvider>
  );
}
// Export the App function.
export default App;
