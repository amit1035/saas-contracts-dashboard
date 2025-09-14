import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    console.log('Initial auth check - token found:', !!token);
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  
  const login = (credentials) => {
    console.log('Login function called with:', credentials);
    const { username, password } = credentials;
    
    // Mock authentication - accept any username, password must be test123
    if (password !== 'test123') {
      console.log('Password incorrect');
      setError('Invalid password. Hint: Use "test123"');
      return false;
    }
    
    console.log('Password correct, setting authenticated');
    // Mock JWT token
    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ username }));
    setIsAuthenticated(true);
    setError('');
    return true;
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };
  
  const value = {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
  
  console.log('AuthContext value:', value);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  console.log('useAuth hook called');
  const context = useContext(AuthContext);
  console.log('useAuth context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};