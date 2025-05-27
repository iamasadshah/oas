import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create authentication context
export const AuthContext = createContext();

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods to children
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthContext Provider
 */
export const AuthProvider = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);

  // Effect to check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode and validate token
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        // Handle invalid token
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  /**
   * Login function to handle user authentication
   * @param {string} token - JWT token received from server
   */
  const login = (token) => {
    // Store token in localStorage
    localStorage.setItem("token", token);
    // Decode and set user information
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  /**
   * Logout function to handle user sign out
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Clear user state
    setUser(null);
  };

  // Provide authentication context to children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
