// frontend/src/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem('userEmail') || null
  );

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    else localStorage.removeItem('role');
  }, [role]);

  useEffect(() => {
    if (userEmail) localStorage.setItem('userEmail', userEmail);
    else localStorage.removeItem('userEmail');
  }, [userEmail]);

  const login = ({ token: newToken, role: newRole, email }) => {
    setToken(newToken || null);
    setRole(newRole || null);
    setUserEmail(email || null);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
