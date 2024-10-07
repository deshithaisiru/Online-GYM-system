import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SearchBar from './components/SearchBar';
import BackButton from './components/BackButton';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [informations, setInformations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // State for handling no results

  // Fetch all employee records on component mount
  useEffect(() => {
    fetchInformationDetails();
  }, []);

  const fetchInformationDetails = () => {
    setLoading(true);
    axios
      .get('http://localhost:5555/informations')
      .then((response) => {
        setInformations(response.data.data);
        setLoading(false);
        setNoResults(false); // Reset no results state
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!searchQuery) {
      fetchInformationDetails(); // If the search query is empty, reset the list
      return;
    }

    console.log("Searching for:", searchQuery);
    setLoading(true);
    axios
      .get(`http://localhost:5555/informations/search-informations?query=${searchQuery}`)
      .then((response) => {
        if (response.data.informations.length === 0) {
          setNoResults(true); // If no matching records found, set noResults to true
        } else {
          setInformations(response.data.informations); // Set the matching employee
          setNoResults(false); // Reset noResults state
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const OnClearSearch = () => {
    setSearchQuery("");
    fetchInformationDetails(); // Reset the employee when clearing the search
  };

  return (
    <div className="p-4 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
      <BackButton />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-black">Employee List</h1>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          OnClearSearch={OnClearSearch}
        />

        <Link to='/informations/create'>
          <button
            className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-700 hover:text-black transition-colors duration-500 transform hover:scale-105 border border-black-800 rounded-md p-2">
            Add Employee
          </button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : noResults ? (
        // Show no results message
        <div className="text-center text-red-500">
          No employee records found matching the search criteria.
        </div>
      ) : (
        <table className="w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-xl shadow-lg text-black">
          <thead>
            <tr className="bg-yellow-600">
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">ID</th>
              <th className="border border-slate-600 rounded-md">First Name</th>
              <th className="border border-slate-600 rounded-md">Last Name</th>
              <th className="border border-slate-600 rounded-md">NIC</th>
              <th className="border border-slate-600 rounded-md">Role</th>
              <th className="border border-slate-600 rounded-md">Gender</th>
              <th className="border border-slate-600 rounded-md">DOB</th>
              <th className="border border-slate-600 rounded-md">Contact No</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">Address</th>
            </tr>
          </thead>
          <tbody>
            {informations.map((information, index) => (
              <tr key={information._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.iD}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.fname}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.lname}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.nic}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.role}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.gender}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.dob}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.conNo}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.email}</td>
                <td className='border border-slate-700 rounded-md text-center'>{information.address}</td>

                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/informations/details/${information._id}`}>
                      <button className='bg-sky-400 text-white px-4 py-2 rounded'>Report</button>
                    </Link>
                    <Link to={`/informations/edit/${information._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-800' />
                    </Link>
                    <Link to={`/informations/delete/${information._id}`}>
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

export default Home;
