import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { MovieCard } from '../components/movie/MovieCard';
import { SearchBar } from '../components/movie/SearchBar';
import { Spinner } from '../components/common/Spinner';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const endpoint = debouncedSearchTerm 
          ? `/movies/search?query=${debouncedSearchTerm}` 
          : '/movies/discover';
        
        const res = await api.get(endpoint);
        setMovies(res.data);
        setError('');
      } catch (err) {
        console.error("Failed to fetch movies", err);
        setError('Could not load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-4">Discover Movies</h1>
      <p className="text-gray-400 mb-8">Explore the most popular and trending movies, or search for something specific.</p>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {loading ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-400 mt-10">{error}</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">No movies found. Try a different search.</p>
      )}
    </div>
  );
};
