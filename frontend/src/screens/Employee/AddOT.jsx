import React, { useState } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddOT = () => {
  const [iD, setiD] = useState('');
  const [name, setName] = useState('');
  const [otDate, setOtDate] = useState('');
  const [otHrs, setOtHrs] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveOTDetails = () => {
    const data = {
      iD,
      name,
      otDate,
      otHrs,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/ot', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('OT added successfully', { variant: 'success' });
        navigate('/ot');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error adding OT', { variant: 'error' });
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className='min-h-screen p-8 bg-gradient-to-r from-white to-yellow-500'> {/* Background gradient matching AddEmployee.jsx */}
      <button 
        onClick={handleBack} 
        className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
      >
        Back
      </button>
       
      {loading ? <Spinner /> : ''}

      <div className='flex flex-col bg-white bg-opacity-50 border border-black rounded-lg p-8 shadow-lg mx-auto w-[600px]'>  
        <div className='my-4'>
          <label className='text-xl text-black w-32'>ID</label>
          <input
            type='text'
            value={iD}
            onChange={(e) => setiD(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>OT Date</label>
          <input
            type='date'
            value={otDate}
            onChange={(e) => setOtDate(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>OT Hours</label>
          <input
            type='number'
            value={otHrs}
            onChange={(e) => setOtHrs(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <button
          className='bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg mt-6 hover:bg-yellow-700 transition-colors duration-500 transform hover:scale-105'
          onClick={handleSaveOTDetails}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddOT;
