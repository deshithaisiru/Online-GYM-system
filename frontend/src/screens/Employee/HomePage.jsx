import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div
            className="h-screen flex flex-col items-center justify-center space-y-8 p-4 bg-gradient-to-r from-white to-yellow-500 min-h-screen"
            
        >
            <h1 className="text-5xl font-bold mb-8 text-black ">Employee Management</h1> {/* White text for contrast */}

            <div className="grid grid-cols-2 gap-6">
                <button
                    className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2"
                    onClick={() => handleNavigation('/informations')}
                >
                    Employee Information
                </button>

                <button
                    className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2"
                    onClick={() => handleNavigation('/salary')}
                >
                    Salary
                </button>

                <button
                    className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2"
                    onClick={() => handleNavigation('/leave')}
                >
                    Leave
                </button>

                <button
                    className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2"
                    onClick={() => handleNavigation('/ot')}
                >
                    OT
                </button>
            </div>
        </div>
    );
};

export default HomePage;
