// pages/HomePage.js
import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import BMICalculator from '../components/BMICalculator';

const HomePage = () => {
  // Access userInfo from Redux store
  const userInfo = useSelector((state) => state.auth.userInfo); // Adjust the state path as per your store configuration

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the Aura Fitness, {userInfo?.name || 'Guest'}!
        </h1>
      </div>

      <div className="container mx-auto">
        <BMICalculator />
      </div>
    </div>
  );
};

export default HomePage;
