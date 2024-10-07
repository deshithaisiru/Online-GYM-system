import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditSalaryrecord = () => {
    const [iD, setiD] = useState('');
    const [month, setMonth] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [bsalary, setBsalary] = useState('');
    const [otHour, setOthour] = useState('');
    const [otRate, setOtrate] = useState('');
    const [otTotal, setOttotal] = useState('');
    const [bonus, setBonus] = useState('');
    const [tsalary, setTsalary] = useState(''); // This will be calculated
    const [payst, setPayst] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const trimmedId = id.trim();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/salarys/${trimmedId}`)
            .then((response) => {
                setiD(response.data.iD);
                setMonth(response.data.month);
                setName(response.data.name);
                setRole(response.data.role);
                setEmail(response.data.email);
                setBsalary(response.data.bsalary);
                setOthour(response.data.otHour);
                setOtrate(response.data.otRate);
                setOttotal(response.data.otTotal);
                setBonus(response.data.bonus);
                setTsalary(response.data.tsalary);
                setPayst(response.data.payst);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                enqueueSnackbar('An error occurred. Check the console for details.', { variant: 'error' });
                console.log(error);
            });
    }, [trimmedId, enqueueSnackbar]);

    const handleEditSalaryrecord = () => {
        const data = {
            iD,
            month,
            name,
            role,
            email,
            bsalary: Number(bsalary),
            otHour: Number(otHour),
            otRate: Number(otRate),
            otTotal: Number(otTotal),
            bonus: Number(bonus),
            tsalary: Number(tsalary),
            payst,
        };

        if (Object.values(data).some(field => field === '' || field === null)) {
            enqueueSnackbar('Please fill out all fields.', { variant: 'warning' });
            return;
        }

        setLoading(true);
        axios.put(`http://localhost:5555/salarys/${trimmedId}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Salary Record Edited successfully', { variant: 'success' });
                navigate('/salary');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    const calculateTotalSalary = () => {
        const otTotalCalculated = otHour * otRate;
        const totalSalary = Number(bsalary) + otTotalCalculated + Number(bonus);
        setOttotal(otTotalCalculated); // Set OT total
        setTsalary(totalSalary); // Set total salary
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="p-8 bg-gradient-to-r from-white to-yellow-500 min-h-screen">  {/* Added gradient background */}
            <button 
                onClick={handleBack} 
                className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
                Back
            </button>
            <h1 className='text-4xl my-4 font-bold text-center'>Salary Record</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-gray-400 rounded-lg w-[700px] p-6 mx-auto bg-white bg-opacity-50 shadow-lg'> {/* Added form transparency */}
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
                <div className='mb-4'>
                    <label className='text-lg font-semibold mb-2 block'>Total Salary</label>
                    <input
                        type='number'
                        value={tsalary}
                        onChange={(e) => setTsalary(e.target.value)}
                        className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-lg font-semibold mb-2 block'>OT Total</label>
                    <input
                        type='number'
                        value={otTotal}
                        onChange={(e) => setOttotal(e.target.value)}
                        className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-lg font-semibold mb-2 block'>Payment Status</label>
                    <select
                        value={payst}
                        onChange={(e) => setPayst(e.target.value)}
                        className='border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500'
                    >
                        <option value='' disabled>Select Payment Status</option>
                        <option value='Paid'>Paid</option>
                        <option value='Pending'>Pending</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                    <button
                        onClick={calculateTotalSalary}
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300'
                    >
                        Calculate
                    </button>
                    <button
                        onClick={handleEditSalaryrecord}
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSalaryrecord;
