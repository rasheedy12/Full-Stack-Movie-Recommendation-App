import React from 'react';
import { Link } from 'react-router-dom';

// Base URL for TMDb poster images
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieCard = ({ movie }) => {
  // Use a placeholder if the poster path is missing
  const posterPath = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` 
    : 'https://placehold.co/500x750/1a202c/ffffff?text=No+Image';
  
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out block group"
    >
      <img 
        src={posterPath} 
        alt={`${movie.title} Poster`} 
        className="w-full h-auto object-cover aspect-[2/3]" // Enforce a 2:3 aspect ratio
        onError={(e) => { 
          // Fallback for broken image links
          e.target.onerror = null; 
          e.target.src='https://placehold.co/500x750/1a202c/ffffff?text=Error'; 
        }}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-white truncate group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-400">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </p>
          {/* Only show the rating if it's greater than 0 */}
          {movie.vote_average > 0 && (
            <span className="flex items-center text-yellow-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
