import React, { useState } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteEmployeeDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployeeDetails = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/informations/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee Deleted successfully', { variant: 'success' });
        navigate('/informations');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen p-4 bg-gray-200'>
      {/* New Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className='mb-4 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300'
      >
        Back
      </button>
      
      
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-black rounded-xl w-[600px] p-8 mx-auto bg-gray-400'>
        <h3 className='text-2xl'>Are You Sure You want to delete this employee?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteEmployeeDetails}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeleteEmployeeDetails;
