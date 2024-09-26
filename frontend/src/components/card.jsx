// components/ui/card.js
import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="bg-gray-100 px-6 py-4 border-b">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-6">
      {children}
    </div>
  );
};

export const CardFooter = ({ children }) => {
  return (
    <div className="bg-gray-100 px-6 py-4 border-t">
      {children}
    </div>
  );
};