// Import React, createContext, useState, useEffect, and useContext from react.
import React, { createContext, useState, useEffect, useContext } from "react";
// Import AuthService from AuthService.js.
import AuthService from "./AuthService.js";
// Create a new context for the authentication.
const AuthContext = createContext();
// Create a new AuthProvider component.
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());
  const [user, setUser] = useState(null);
  // Use the useEffect hook to check the login status.
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = AuthService.loggedIn();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUser(AuthService.getProfile());
      } else {
        setUser(null);
      }
    };
    // Call the checkLoginStatus function.
    checkLoginStatus();
    // You could add an interval here to periodically check token expiration
    // const interval = setInterval(checkLoginStatus, 60000); // Check every minute
    // return () => clearInterval(interval);
  }, []);
  // Define the login and logout functions.
  const login = (idToken) => {
    try {
      AuthService.login(idToken);
      setIsLoggedIn(true);
      setUser(AuthService.getProfile());
    } catch (error) {
      console.error("Login failed:", error);
      // You might want to throw this error to be handled by the component using this hook
    }
  };
  // Define the logout function.
  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };
  // Return the AuthContext.Provider with the value set to the login, logout, and user functions.
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        getProfile: AuthService.getProfile,
        getToken: AuthService.getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// Export a custom hook to use the AuthContext.
export function useAuth() {
  return useContext(AuthContext);
}
