import { Navigate, Outlet } from "react-router-dom";
import Auth from "../../hooks/AuthService.js";

const token = Auth.getToken();
const ProtectedRoute = () => {
  if (token && typeof token.isLoggedIn === "function" && token.isLoggedIn()) {
    return <Navigate to="/registration" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
