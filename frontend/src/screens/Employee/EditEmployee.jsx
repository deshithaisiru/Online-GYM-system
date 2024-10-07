import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditEmployeeDetails = () => {
  const [iD, setiD] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [nic, setNIC] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [conNo, setConNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bsalary, setBsalary] = useState('');
  const [dateJoin, setDateJoin] = useState('');
  const [dateTer, setDateTer] = useState('');
  const [loading, setLoading] = useState(false);
  const [minDateTer, setMinDateTer] = useState(''); // State to hold the minimum date for termination
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/informations/${id}`)
      .then((response) => {
        const data = response.data;
        setiD(data.iD);
        setFname(data.fname);
        setLname(data.lname);
        setNIC(data.nic);
        setRole(data.role);
        setGender(data.gender);
        setDOB(data.dob);
        setConNo(data.conNo);
        setEmail(data.email);
        setAddress(data.address);
        setBsalary(data.bsalary);
        setDateJoin(data.dateJoin);
        setDateTer(data.dateTer);
        setMinDateTer(data.dateJoin); // Set min date for termination based on joining date
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Check the console for details.', { variant: 'error' });
        console.error('Error fetching employee data:', error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditEmployeeDetails = () => {
    // Data validation
    if (!iD || !lname || !nic || !role || !gender || !dob || !conNo || !email || !address || !bsalary || !dateJoin) {
      enqueueSnackbar('Please fill out all required fields.', { variant: 'warning' });
      return;
    }

    // Check if date of termination is after date of joining
    if (dateTer && new Date(dateTer) <= new Date(dateJoin)) {
      enqueueSnackbar('Date of Termination must be after Date of Joining.', { variant: 'warning' });
      return;
    }

    const data = {
      iD,
      fname,
      lname,
      nic,
      role,
      gender,
      dob: new Date(dob).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      conNo,
      email,
      address,
      bsalary: Number(bsalary), // Convert to number
      dateJoin: new Date(dateJoin).toISOString().split('T')[0], // Format date
      dateTer: dateTer ? new Date(dateTer).toISOString().split('T')[0] : null, // Optional terminate date
    };

    console.log('Data being sent:', data);

    setLoading(true);
    axios
      .put(`http://localhost:5555/informations/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee details updated successfully', { variant: 'success' });
        navigate('/informations');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error occurred while updating employee details.', { variant: 'error' });
        console.error('Error during employee update:', error);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-8 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
      <button 
        onClick={handleBack} 
        className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
      >
        Back
      </button>
      <h1 className="text-3xl my-4 text-center font-bold"> Employee Details</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-gray-500 rounded-lg w-[600px] p-6 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        {/* Form Fields */}
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Employee TD</label>
          <input
            type="text"
            value={iD}
            onChange={(e) => setiD(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">First Name</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Last Name</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">NIC</label>
          <input
            type="text"
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>Select Role</option>
            <option value="Coach">Coach</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Dietitian">Dietitian</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Manager">Manager</option>
            <option value="General Manager">General Manager</option>
            <option value="Fitness Instructor">Fitness Instructor</option>
            <option value="Personal Trainer">Personal Trainer</option>
            <option value="Physical Therapist">Physical Therapist</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">DOB</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Contact No</label>
          <input
            type="text"
            value={conNo}
            onChange={(e) => setConNo(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows="3"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Basic Salary</label>
          <input
            type="number"
            value={bsalary}
            onChange={(e) => setBsalary(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Date of Joining</label>
          <input
            type="date"
            value={dateJoin}
            onChange={(e) => setDateJoin(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="my-4">
          <label className="text-lg mr-4 text-black">Date of Termination (Optional)</label>
          <input
            type="date"
            value={dateTer}
            onChange={(e) => setDateTer(e.target.value)}
            min={minDateTer} // Set minimum date for termination
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={handleEditEmployeeDetails}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditEmployeeDetails;
