import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default value
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching user data from an API or local storage
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Replace with real API call
        const userData = await fakeApiCallToFetchUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    // Mock login function, replace with real API call
    const userData = await fakeApiCallToLogin(credentials);
    setUser(userData);
  };

  const logout = async () => {
    // Mock logout function, replace with real API call
    await fakeApiCallToLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Mock API calls for demonstration purposes
const fakeApiCallToFetchUser = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), 1000)
  );

const fakeApiCallToLogin = (credentials) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), 1000)
  );

const fakeApiCallToLogout = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 1000));
