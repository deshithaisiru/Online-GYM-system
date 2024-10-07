import React, { useState } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteSalaryrecord = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteSalaryrecord = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/salarys/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Salary Record Deleted successfully', { variant: 'success' });
        navigate('/salary');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='min-h-screen p-4 bg-gray-200'>
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
      >
        Back
      </button>
       
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-black-700 rounded-xl w-[600px] p-8 mx-auto bg-gray-400'>
        <h3 className='text-2xl'>Are You Sure You want to delete this salary record?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteSalaryrecord}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteSalaryrecord;
