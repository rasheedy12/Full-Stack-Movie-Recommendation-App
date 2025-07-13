import React, { useState, useEffect, createContext, useContext } from 'react';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Auth Error: Failed to load user', err);
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    const userRes = await api.get('/auth/me');
    setUser(userRes.data);
  };

  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    const userRes = await api.get('/auth/me');
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthToken(null);
  };

  const addFavorite = async (movieId) => {
    const res = await api.post('/users/favorites', { movieId });
    setUser(res.data); // Backend returns the updated user
  };

  const removeFavorite = async (movieId) => {
    const res = await api.delete(`/users/favorites/${movieId}`);
    setUser(res.data); // Backend returns the updated user
  };

  const value = { user, loading, login, register, logout, addFavorite, removeFavorite };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
