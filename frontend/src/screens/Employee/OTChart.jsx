import React from 'react';
import { Bar } from 'react-chartjs-2';

const OTChart = ({ otData }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: otData.map(record => record.name), // Employee names
    datasets: [
      {
        label: 'OT Hours',
        data: otData.map(record => record.otHrs), // OT hours
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl mb-4">Overtime Hours by Employee</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OTChart;
