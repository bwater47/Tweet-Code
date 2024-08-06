import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "./AuthService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());

  useEffect(() => {
    setIsLoggedIn(AuthService.loggedIn());
  }, []);

  const login = (idToken) => {
    AuthService.login(idToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getProfile: AuthService.getProfile,
        getToken: AuthService.getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
