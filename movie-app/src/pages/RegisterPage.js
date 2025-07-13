import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
// Re-using the small spinner component
const ButtonSpinnerReg = () => <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>;

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setError('');
    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Create an Account</h2>
        {error && <p className="text-red-500 bg-red-900/50 border border-red-500 p-3 rounded-lg text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-1">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-3 text-white bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 text-white bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 text-white bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <ButtonSpinnerReg /> : 'Register'}
          </Button>
        </form>
        <p className="text-center text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-red-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};
