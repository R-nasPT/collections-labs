import { useState, useEffect } from 'react';
import { isAuthenticated, login, logout } from '../helpers/authHelper';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return {
    authenticated,
    login,
    logout,
  };
};
