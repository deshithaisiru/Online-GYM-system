// components/ui/button.js
import React from 'react';

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-medium rounded-md transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};