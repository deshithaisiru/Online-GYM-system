import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { format } from 'date-fns';
import BackButton from './components/BackButton';
import { useSnackbar } from 'notistack';

const HomeLeave = () => {
    const [leave, setLeave] = useState([]); // Pending leaves
    const [approvedLeaves, setApprovedLeaves] = useState([]); // Approved leaves
    const [rejectedLeaves, setRejectedLeaves] = useState([]); // Rejected leaves
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        fetchLeaveRecords();
        fetchApprovedLeaves();
        fetchRejectedLeaves();
    }, []);

    const fetchLeaveRecords = () => {
        setLoading(true);
        axios.get('http://localhost:5555/leave')
            .then(response => {
                setLeave(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const fetchApprovedLeaves = () => {
        axios.get('http://localhost:5555/leave/approved')
            .then(response => {
                setApprovedLeaves(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchRejectedLeaves = () => {
        axios.get('http://localhost:5555/leave/rejected')
            .then(response => {
                setRejectedLeaves(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleApprove = (leaveId) => {
        axios.post(`http://localhost:5555/leave/approve/${leaveId}`)
            .then(response => {
                enqueueSnackbar('Leave approved and email sent successfully', { variant: 'success' });
                setLeave(prevLeaves => prevLeaves.filter(leave => leave._id !== leaveId));
                fetchApprovedLeaves();
            })
            .catch(error => {
                console.error("Error approving leave:", error);
                enqueueSnackbar('Failed to approve leave', { variant: 'error' });
            });
    };

    const handleReject = (leaveId) => {
        axios.post(`http://localhost:5555/leave/reject/${leaveId}`)
            .then(response => {
                enqueueSnackbar('Leave rejected and email sent successfully', { variant: 'success' });
                setLeave(prevLeaves => prevLeaves.filter(leave => leave._id !== leaveId));
                fetchRejectedLeaves();
            })
            .catch(error => {
                console.error("Error rejecting leave:", error);
                enqueueSnackbar('Failed to reject leave', { variant: 'error' });
            });
    };

    const handleEdit = (leaveId) => {
        navigate(`/leave/edit/${leaveId}`);
    };

    return (
        <div className='p-4 bg-gradient-to-r from-white to-yellow-500 min-h-screen'>
            <BackButton />
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 text-black'>Employee Leave</h1>
                <Link to='/leave/create'>
                    <button
                        className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2">
                        Add Leave
                    </button>
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {/* Pending Leaves Section */}
                    <h2 className='text-2xl my-4 text-black'>Pending Leaves</h2>
                    <table className='w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black'>
                        <thead>
                            <tr className="bg-yellow-600">
                                <th>No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Leave Start Date</th>
                                <th>Leave End Date</th>
                                <th>No of Leave Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leave.map((leaveRecord, index) => (
                                <tr key={leaveRecord._id}>
                                    <td>{index + 1}</td>
                                    <td>{leaveRecord.iD}</td>
                                    <td>{leaveRecord.name}</td>
                                    <td>{leaveRecord.email}</td>
                                    <td>{format(new Date(leaveRecord.dateStart), 'yyyy-MM-dd')}</td>
                                    <td>{format(new Date(leaveRecord.dateEnd), 'yyyy-MM-dd')}</td>
                                    <td>{leaveRecord.noDate}</td>
                                    <td>{leaveRecord.reason}</td>
                                    <td>{leaveRecord.status}</td>
                                    <td>
                                        <button onClick={() => handleApprove(leaveRecord._id)} className='bg-green-500 text-white px-4 py-1 rounded-md'>Approve</button>
                                        <button onClick={() => handleReject(leaveRecord._id)} className='bg-red-500 text-white px-4 py-1 rounded-md'>Reject</button>
                                        <AiOutlineEdit onClick={() => handleEdit(leaveRecord._id)} className='text-blue-500 text-2xl cursor-pointer' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Approved Leaves Section */}
                    <h2 className='text-2xl my-4 text-black'>Approved Leaves</h2>
                    <table className='w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black'>
                        <thead>
                            <tr className="bg-yellow-600">
                                <th>No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Leave Start Date</th>
                                <th>Leave End Date</th>
                                <th>No of Leave Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedLeaves.map((leaveRecord, index) => (
                                <tr key={leaveRecord._id}>
                                    <td>{index + 1}</td>
                                    <td>{leaveRecord.iD}</td>
                                    <td>{leaveRecord.name}</td>
                                    <td>{leaveRecord.email}</td>
                                    <td>{format(new Date(leaveRecord.dateStart), 'yyyy-MM-dd')}</td>
                                    <td>{format(new Date(leaveRecord.dateEnd), 'yyyy-MM-dd')}</td>
                                    <td>{leaveRecord.noDate}</td>
                                    <td>{leaveRecord.reason}</td>
                                    <td>{leaveRecord.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Rejected Leaves Section */}
                    <h2 className='text-2xl my-4 text-black'>Rejected Leaves</h2>
                    <table className='w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black'>
                        <thead>
                            <tr className="bg-yellow-600">
                                <th>No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Leave Start Date</th>
                                <th>Leave End Date</th>
                                <th>No of Leave Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rejectedLeaves.map((leaveRecord, index) => (
                                <tr key={leaveRecord._id}>
                                    <td>{index + 1}</td>
                                    <td>{leaveRecord.iD}</td>
                                    <td>{leaveRecord.name}</td>
                                    <td>{leaveRecord.email}</td>
                                    <td>{format(new Date(leaveRecord.dateStart), 'yyyy-MM-dd')}</td>
                                    <td>{format(new Date(leaveRecord.dateEnd), 'yyyy-MM-dd')}</td>
                                    <td>{leaveRecord.noDate}</td>
                                    <td>{leaveRecord.reason}</td>
                                    <td>{leaveRecord.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default HomeLeave;
