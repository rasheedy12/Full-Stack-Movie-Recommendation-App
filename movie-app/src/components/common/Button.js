import React from 'react';

/**
 * A reusable button component with variants.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button (e.g., text, an icon).
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.type='button'] - The button's type (e.g., 'button', 'submit').
 * @param {string} [props.variant='primary'] - The button's style variant ('primary' or 'secondary').
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className=''] - Additional classes to apply to the button.
 */
export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) => {
  
  // Base styles that apply to all buttons
  const baseStyles = 'font-bold py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center h-12 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Style variants for different button types
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // Combine base styles, the selected variant style, and any additional custom classes
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
