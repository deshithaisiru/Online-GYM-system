import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateSalaryrecord = () => {
  const [iD, setiD] = useState('');
  const [month, setMonth] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [bsalary, setBsalary] = useState('');
  const [otHour, setOthour] = useState('');
  const [otRate, setOtrate] = useState('');
  const [bonus, setBonus] = useState('');
  const [otTotal, setOttotal] = useState(0);
  const [tsalary, setTsalary] = useState(0);
  const [payst, setPayst] = useState('Paid'); // Default value set to 'Paid'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // OT rate map based on the month
  const otRates = {
    January: 500,
    February: 550,
    March: 500,
    April: 700,
    May: 450,
    June: 575,
    July: 600,
    August: 400,
    September: 600,
    October: 500,
    November: 550,
    December: 620,
  };

  // UseEffect to update OT rate when month changes
  useEffect(() => {
    if (month) {
      setOtrate(otRates[month] || ''); // Set OT rate based on the selected month
    }
  }, [month]);

  const handleCalculateSalary = () => {
    const otTotalCalc = parseFloat(otHour) * parseFloat(otRate);
    const totalSalary = parseFloat(bsalary) + otTotalCalc + parseFloat(bonus);
    setOttotal(otTotalCalc); // Update OT Total
    setTsalary(totalSalary); // Update Total Salary
  };

  const handleSaveSalaryrecord = () => {
    // Validate required fields
    if (!iD || !month || !name || !role || !email || !bsalary || !otHour || !otRate || !bonus) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    const data = {
      iD,
      month,
      name,
      role,
      email,
      bsalary: parseFloat(bsalary), // Ensure number types
      otHour: parseFloat(otHour), // Ensure number types
      otRate: parseFloat(otRate), // Ensure number types
      otTotal,
      bonus: parseFloat(bonus), // Ensure number types
      tsalary,
      payst,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/salarys', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Salary Record Created successfully', { variant: 'success' });
        navigate('/salary');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.error("Response data:", error.response.data);
          enqueueSnackbar('Error: ' + error.response.data.message || 'An error occurred', { variant: 'error' });
        } else {
          console.error("Error message:", error.message);
          enqueueSnackbar('Error: ' + error.message, { variant: 'error' });
        }
      });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
      {/* Updated Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
      >
        Back
      </button>
      
      <h1 className='text-4xl my-4 font-bold text-center'>Salary Record</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-gray-400 rounded-lg w-[700px] p-6 mx-auto bg-white bg-opacity-50 shadow-lg'>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>ID</label>
          <input
            type='text'
            value={iD}
            onChange={(e) => setiD(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          >
            <option value='' disabled>Select Month</option>
            <option value='January'>January</option>
            <option value='February'>February</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          >
            <option value='' disabled>Select Role</option>
            <option value='Coach'>Coach</option>
            <option value='Cleaner'>Cleaner</option>
            <option value='Dietitian'>Dietitian</option>
            <option value='Receptionist'>Receptionist</option>
            <option value='Manager'>Manager</option>
            <option value='General Manager'>General Manager</option>
            <option value='Fitness Instructor'>Fitness Instructor</option>
            <option value='Personal Trainer'>Personal Trainer</option>
            <option value='Physical Therapist'>Physical Therapist</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Basic Salary</label>
          <input
            type='number'
            value={bsalary}
            onChange={(e) => setBsalary(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>OT Hours</label>
          <input
            type='number'
            value={otHour}
            onChange={(e) => setOthour(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>OT Rate</label>
          <input
            type='number'
            value={otRate}
            onChange={(e) => setOtrate(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
            readOnly // Auto-filled based on the selected month
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold mb-2 block'>Bonus</label>
          <input
            type='number'
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
          />
        </div>
        <button
          onClick={handleCalculateSalary}
          className='bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition duration-300'
        >
          Calculate
        </button>
        <div className='mt-4'>
          <label className='text-lg font-semibold mb-2 block'>Total OT</label>
          <input
            type='text'
            value={otTotal}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
            readOnly
          />
        </div>
        <div className='mt-4'>
          <label className='text-lg font-semibold mb-2 block'>Total Salary</label>
          <input
            type='text'
            value={tsalary}
            className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
            readOnly
          />
        </div>
        <button
          onClick={handleSaveSalaryrecord}
          className='mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition duration-300'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateSalaryrecord;
