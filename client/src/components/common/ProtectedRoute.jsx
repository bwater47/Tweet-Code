// Import Navigate, and Outlet from react-router-dom.
import { Navigate, Outlet } from "react-router-dom";
// Import the Auth hook from the AuthService file.
import Auth from "../../hooks/AuthService.js";
// Define the ProtectedRoute component.
const token = Auth.getToken();
// Define the ProtectedRoute component.
const ProtectedRoute = () => {
  // If the user is logged in, redirect them to the registration page.
  if (token && typeof token.isLoggedIn === "function" && token.isLoggedIn()) {
    return <Navigate to="/registration" replace />;
  }
  // If the user is not logged in, render the Outlet component.
  return <Outlet />;
};
// Export the ProtectedRoute component.
export default ProtectedRoute;
