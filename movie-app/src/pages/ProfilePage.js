import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { MovieCard } from '../components/movie/MovieCard';
import { Spinner } from '../components/common/Spinner';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.favorites?.length > 0) {
        try {
          setLoading(true);
          // This endpoint fetches details for multiple movies by their IDs
          const res = await api.post('/movies/batch', { ids: user.favorites });
          setFavoriteMovies(res.data);
        } catch (err) {
          console.error("Failed to fetch favorite movies", err);
        }
      }
      setLoading(false);
    };
    fetchFavorites();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p className="text-lg mb-2"><span className="font-bold">Username:</span> {user.username}</p>
        <p className="text-lg mb-6"><span className="font-bold">Email:</span> {user.email}</p>
        <hr className="border-gray-700 my-8" />
        <h2 className="text-3xl font-bold mb-6">My Favorite Movies</h2>
        {loading ? (
          <Spinner />
        ) : favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {favoriteMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        ) : (
          <p className="text-gray-400">You haven't added any favorites yet. Go discover some movies!</p>
        )}
      </div>
    </div>
  );
};
