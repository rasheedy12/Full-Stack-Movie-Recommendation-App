import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the homepage after logging out
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl tracking-tight text-white">
          Movie<span className="text-red-500">Verse</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-red-400 transition-colors">Profile</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-400 transition-colors">Login</Link>
              <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
