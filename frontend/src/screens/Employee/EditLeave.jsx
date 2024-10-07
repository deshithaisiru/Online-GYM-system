import React, { useState, useEffect } from 'react';
import BackButton from './components/BackButton';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';

const EditLeaveDetails = () => {
  const [iD, setiD] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [noDate, setNoDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/leave/${id}`)
      .then((response) => {
        const data = response.data;
        setiD(data.iD);
        setName(data.name);
        setEmail(data.email);
        setDateStart(format(new Date(data.dateStart), 'yyyy-MM-dd'));  
        setDateEnd(format(new Date(data.dateEnd), 'yyyy-MM-dd'));
        setNoDate(data.noDate);
        setReason(data.reason);
        setStatus(data.status);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Check the console for details.', { variant: 'error' });
        console.error('Error fetching leave data:', error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditLeaveDetails = () => {
    // Data validation
    if (!iD ||!name || !email || !dateStart || !dateEnd || !noDate || !reason || !status) {
      enqueueSnackbar('Please fill out all required fields.', { variant: 'warning' });
      return;
    }

    const data = {
      iD,
      name,
      email,
      dateStart: new Date(dateStart).toISOString().split('T')[0],
      dateEnd: new Date(dateEnd).toISOString().split('T')[0],
      noDate: Number(noDate),
      reason,
      status,
    };

    console.log('Data being sent:', data);

    setLoading(true);
    axios
      .put(`http://localhost:5555/leave/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Leave details updated successfully', { variant: 'success' });
        navigate('/leave');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error occurred while updating leave details.', { variant: 'error' });
        console.error('Error during leave update:', error);
      });
  };

  return (
    <div className='min-h-screen p-4 bg-gray-200'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Leave</h1>
      {loading ? <Spinner /> : null}
      <div className='flex flex-col border-2 border-black-1000 rounded-xl w-[600px] p-4 mx-auto bg-gray-400'>

      <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'> ID</label>
          <input
            type='text'
            value={iD}
            onChange={(e) => setiD(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'> Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>Leave Start Date</label>
          <input
            type='date'
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>Leave End Date</label>
          <input
            type='date'
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>No of leave</label>
          <input
            type='number'
            value={noDate}
            onChange={(e) => setNoDate(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>Reason</label>
          <input
            type='text'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-700'>Status</label>
          <input
            type='text'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-black-700 px-4 py-2 w-full'
          />
        </div>
        <button
          className={`p-2 bg-yellow-500 m-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleEditLeaveDetails}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditLeaveDetails;
