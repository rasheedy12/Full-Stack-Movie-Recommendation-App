import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Layout & Page Components using NAMED imports (with curly braces)
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { Spinner } from './components/common/Spinner';

// A wrapper to protect routes that require authentication.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // While the app is checking for a token, show a spinner
  if (loading) {
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  }
  
  // If loading is finished, check if a user exists. If so, show the protected content.
  // Otherwise, redirect to the login page.
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            
            {/* Private Route */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />

            {/* Fallback Route for any other path */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
