import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiOutlineEdit } from 'react-icons/ai'; 
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SearchBar from './components/SearchBar';
import BackButton from './components/BackButton';

const HomeSalary = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [salarys, setSalarys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchSalaryRecords();
    }, []);

    const fetchSalaryRecords = () => {
        setLoading(true);
        axios
            .get('http://localhost:5555/salarys')
            .then((response) => {
                setSalarys(response.data.data);
                setLoading(false);
                setNoResults(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleSearch = () => {
        if (!searchQuery) {
            fetchSalaryRecords();
            return;
        }
        console.log("Search query:", searchQuery);
    
        setLoading(true);
        axios
            .get(`http://localhost:5555/salarys/search-salarys?query=${searchQuery}`)
            .then((response) => {
                if (response.data.salarys.length === 0) {
                    setNoResults(true);
                } else {
                    setSalarys(response.data.salarys);
                    setNoResults(false);
                }
                 
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const onClearSearch = () => {
        setSearchQuery("");
        fetchSalaryRecords(); // Reset the salary records
        navigate("/salarys"); // Navigate back to HomeSalary
    };

    return (
        <div className="p-4 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
            <BackButton />

            <div className='flex justify-between items-center'>
                <h1 className="text-3xl my-8 text-black">Employee Salary Assessment</h1>

                <SearchBar 
                    value={searchQuery}
                    onChange={({ target }) => {setSearchQuery(target.value)}}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />

                <Link to='/salarys/create'>
                    <button
                        className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2">
                        Add Record
                    </button> 
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : noResults ? (
                <div className='text-center text-red-500'>
                    No salary records found matching the search criteria.
                </div>
            ) : (
                <table className="w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black">
                    <thead>
                        <tr className="bg-yellow-600">
                            <th className='border border-slate-600 rounded-md'>ID</th>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Month</th>
                            <th className='border border-slate-600 rounded-md'>Name</th>
                            <th className='border border-slate-600 rounded-md'>Role</th>
                            <th className='border border-slate-600 rounded-md'>Email</th>
                            <th className='border border-slate-600 rounded-md'>Basic Salary</th>
                            <th className='border border-slate-600 rounded-md'>Total Salary</th>
                            <th className='border border-slate-600 rounded-md'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salarys.map((salary, index) => (
                            <tr key={salary._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.iD}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.month}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.name}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.role}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.email}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.bsalary}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.tsalary}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{salary.payst}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/salarys/details/${salary._id}`}>
                                            <button className='bg-sky-400 text-white px-4 py-2 rounded'>Report</button>
                                        </Link>
                                        <Link to={`/salarys/edit/${salary._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-800' />
                                        </Link>
                                        <Link to={`/salarys/delete/${salary._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-800' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HomeSalary;
