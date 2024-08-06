import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/registration" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
