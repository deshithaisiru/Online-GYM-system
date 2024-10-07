import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux'; // Import useSelector

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo); // Access userInfo from Redux

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/progress/getall`);
        const data = await res.json();
        if (res.ok) {
          // Filter the data for the logged-in user
          const userProgress = data.equipment.filter(item => item.name === userInfo.name);
          setInfo(userProgress);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, [userInfo.name]); // Dependency array updated to include userInfo.name

  // Prepare data for the chart
  const chartData = Info.map(item => ({
    week: `Week ${item.Weekno}`,
    exerciseTime: parseFloat(item.Extime) // Assuming Extime is a string, convert to number
  })).sort((a, b) => a.week.localeCompare(b.week)); // Sort by week

  return (
    <div className="min-h-screen bg-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-800 text-center mb-8">My Progress</h1>

        <Link to="/addprogress">
          <button className="w-full md:w-auto mb-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            Add Progress
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Info.length > 0 ? (
            Info.map((Employe) => (
              <div key={Employe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-yellow-400 p-4">
                  <h2 className="text-2xl font-bold text-center text-white">Week {Employe.Weekno}</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-yellow-800">
                    <div>
                      <p className="font-semibold">Weight:</p>
                      <p>{Employe.weight} kg</p>
                    </div>
                    <div>
                      <p className="font-semibold">Height:</p>
                      <p>{Employe.height} cm</p>
                    </div>
                    <div>
                      <p className="font-semibold">Exercise Time:</p>
                      <p>{Employe.Extime} mins</p>
                    </div>
                    <div>
                      <p className="font-semibold">Water Intake:</p>
                      <p>{Employe.Wintake} liters</p>
                    </div>
                    <div>
                      <p className="font-semibold">Sleep Time:</p>
                      <p>{Employe.sleepTime} hours</p>
                    </div>
                    <div>
                      <p className="font-semibold">Rest Day:</p>
                      <p>{Employe.RestDay}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold">Meals:</p>
                    <p>{Employe.meals}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-2xl font-serif text-yellow-800 opacity-60 col-span-full text-center">No progress data available</p>
          )}
        </div>

        {/* Exercise Time Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Exercise Time Progression</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="exerciseTime" stroke="#FBBF24" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
