// components/StarRating.js
import React from 'react';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index < rating ? '★' : '☆'; // Use filled star for ratings and empty star otherwise
  });

  return (
    <span className='text-yellow-500'>
      {stars.map((star, index) => (
        <span key={index} className="text-xl">{star}</span> // Adjust the size of the stars here
      ))}
    </span>
  );
};

export default StarRating;
