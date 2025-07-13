import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/common/Spinner';
import { Button } from '../components/common/Button';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

export const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();

  const isFavorited = user?.favorites?.includes(Number(id));

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isFavorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  };

  if (loading) return <div className="mt-20"><Spinner /></div>;
  if (!movie) return <p className="text-center text-red-400 mt-10">Movie not found.</p>;

  const posterPath = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1a202c/ffffff?text=No+Image';

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={posterPath} alt={movie.title} className="rounded-lg shadow-xl w-full" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">{movie.title} ({movie.release_date.substring(0, 4)})</h1>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-6 text-gray-400">
            <span className="flex items-center text-yellow-400 text-xl">
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.genres.map(g => g.name).join(', ')}</span>
            <span>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</span>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>
          <div className="flex space-x-4">
            <Button onClick={handleFavoriteClick} variant={isFavorited ? 'secondary' : 'primary'}>
              {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

