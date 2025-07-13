import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-12 py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} MovieVerse. All Rights Reserved.</p>
        <p className="text-sm mt-1">
          This project uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </footer>
  );
};

