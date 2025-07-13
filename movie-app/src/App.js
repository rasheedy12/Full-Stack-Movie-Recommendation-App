import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Layout & Page Components
import { Navbar } from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MovieDetailPage from './pages/MovieDetailPage';

// A wrapper to protect routes that require authentication.
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        // Optionally, return a loading spinner while checking auth state
        return <div>Loading...</div>;
    }
    return user ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen font-sans">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            {/* For brevity, LoginPage, RegisterPage etc. are commented out,
              but this is where you would define their routes.
            */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            {/* <Route path="/movie/:id" element={<MovieDetailPage />} /> */}
            
            {/* Private Routes */}
            {/* <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            /> */}

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

