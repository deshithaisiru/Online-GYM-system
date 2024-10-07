import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary scales and elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OTChart = ({ otData }) => {
    // Function to aggregate OT hours
    const aggregateOTData = (data) => {
        const aggregatedData = {};

        data.forEach(item => {
            if (aggregatedData[item.name]) {
                aggregatedData[item.name] += item.otHrs; // Sum OT hours for the same employee
            } else {
                aggregatedData[item.name] = item.otHrs; // Initialize OT hours for the employee
            }
        });

        // Convert aggregated data back to an array of objects
        return Object.entries(aggregatedData).map(([name, otHrs]) => ({ name, otHrs }));
    };

    const aggregatedOTData = aggregateOTData(otData || []);

    const data = {
        labels: aggregatedOTData.map(item => item.name),
        datasets: [
            {
                label: 'OT Hours',
                data: aggregatedOTData.map(item => item.otHrs),
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Set bar color to black with some transparency
                borderColor: 'rgba(0, 0, 0, 1)', // Set border color to black
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Employee OT Chart',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default OTChart;
