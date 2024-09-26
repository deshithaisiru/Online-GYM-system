// components/ui/checkbox.js
import React from 'react';

export const Checkbox = ({ children, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="mr-2 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <label className="font-medium text-gray-700">{children}</label>
    </div>
  );
};