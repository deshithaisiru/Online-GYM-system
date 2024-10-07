import React, { useState } from 'react';
import Spinner from '../Employee/components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddLeave = () => {
  const [iD, setiD] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [noDate, setNoDate] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveLeaveDetails = () => {
    // Validate dates
    const today = new Date();
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    // Check if leave start date is in the future
    if (startDate <= today) {
      enqueueSnackbar('Leave start date must be after today', { variant: 'error' });
      return;
    }

    // Check if leave end date is after leave start date
    if (endDate <= startDate) {
      enqueueSnackbar('Leave end date must be after leave start date', { variant: 'error' });
      return;
    }

    const data = {
      iD,
      name,
      email,
      dateStart,
      dateEnd,
      noDate,
      reason,
      status: 'Pending', // Automatically set status to 'Pending'
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/leave', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Leave record added successfully', { variant: 'success' });
        navigate('/leave');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error adding Leave record', { variant: 'error' });
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='min-h-screen p-8 bg-gradient-to-r from-white to-yellow-500'>
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
          <label className='text-xl text-black w-32'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>Leave Start Date</label>
          <input
            type='date'
            value={dateStart}
            min={new Date().toISOString().split("T")[0]} // Minimum date is today
            onChange={(e) => setDateStart(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>Leave End Date</label>
          <input
            type='date'
            value={dateEnd}
            min={dateStart} // Minimum date is the selected start date
            onChange={(e) => setDateEnd(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>No of leave</label>
          <input
            type='number'
            value={noDate}
            onChange={(e) => setNoDate(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-black w-32'>Reason</label>
          <input
            type='text'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded'
          />
        </div>

        <button
          className='bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg mt-6 hover:bg-yellow-700 transition-colors duration-500 transform hover:scale-105'
          onClick={handleSaveLeaveDetails}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddLeave;
