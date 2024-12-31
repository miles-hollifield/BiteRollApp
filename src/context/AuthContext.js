import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session (e.g., in localStorage or via API)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: "testuser" }); // Example user data
    }
  }, []);

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
