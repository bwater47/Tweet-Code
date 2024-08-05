import { useState, useEffect } from "react";
import AuthService from "./AuthService.js";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());

  useEffect(() => {
    // Check login status when the component mounts.
    setIsLoggedIn(AuthService.loggedIn());
  }, []);

  return {
    isLoggedIn,
    login: (idToken) => {
      AuthService.login(idToken);
      setIsLoggedIn(true);
    },
    logout: () => {
      AuthService.logout();
      setIsLoggedIn(false);
    },
    getProfile: AuthService.getProfile,
    getToken: AuthService.getToken,
  };
}
