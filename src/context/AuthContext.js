import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Match the key used in Login.js
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user details here using the token
    }
  }, []);
  
  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("access_token", token); // Match the key here as well
  };  

  const logout = () => {
    setIsAuthenticated(false); // Clear authentication state
    setUser(null); // Clear user data
    localStorage.removeItem("access_token"); // Remove the token from localStorage
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
