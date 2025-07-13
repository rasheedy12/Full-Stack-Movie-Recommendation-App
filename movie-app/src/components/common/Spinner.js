import React from 'react';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
    </div>
  );
};