// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const admin = localStorage.getItem("admin");
      const khachhang = localStorage.getItem("khachhang");

      if (admin) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUser(admin);
      } else if (khachhang) {
        setIsAuthenticated(true);
        setIsAdmin(false);
        setUser(khachhang);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, role) => {
    if (role === "admin") {
      localStorage.setItem("admin", userData);
      setIsAdmin(true);
    } else {
      localStorage.setItem("khachhang", userData);
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("khachhang");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
