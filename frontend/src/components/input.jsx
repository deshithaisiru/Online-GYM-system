// components/ui/input.js
import React from 'react';

export const Input = (props) => {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  );
};

export const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block font-medium text-gray-700 mb-2">
      {children}
    </label>
  );
};