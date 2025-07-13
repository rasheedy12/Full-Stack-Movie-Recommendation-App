import React from 'react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-12">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:outline-none focus:border-red-500 transition duration-300"
      />
    </div>
  );
};