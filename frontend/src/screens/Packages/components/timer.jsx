import React, { useState, useEffect } from 'react';

const PackageTimer = ({ startDate, validity }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const start = new Date(startDate);

        if (isNaN(start.getTime())) {
          throw new Error('Invalid start date');
        }

        // validity is already in days, calculate end date
        const end = new Date(start.getTime() + validity * 24 * 60 * 60 * 1000);
        const now = new Date();
        const difference = end - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setTimeLeft({ days, hours, minutes, seconds });
          setError('');
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setError('Package has expired');
        }
      } catch (err) {
        console.error('Error in PackageTimer:', err);
        setError('Error calculating time');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startDate, validity]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold mb-2">Time Remaining</h3>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <p className="text-sm">Days</p>
        </div>
        <div>
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <p className="text-sm">Hours</p>
        </div>
        <div>
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <p className="text-sm">Minutes</p>
        </div>
        <div>
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <p className="text-sm">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default PackageTimer;
