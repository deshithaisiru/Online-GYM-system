import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../../components/input';
import { Checkbox } from '../../components/checkbox';
import { Button } from '../../components/button';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    userType: '',
    mobile: '',
    height: 0,
    weight: 0,
    birthday: '',
    address: '',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/users/specific/${id}`)
      .then(response => {
        // Format birthday to YYYY-MM-DD if it exists
        const fetchedUser = response.data;
        if (fetchedUser.birthday) {
          fetchedUser.birthday = new Date(fetchedUser.birthday).toISOString().split('T')[0];
        }
        setUser(fetchedUser);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`/api/users/specific/${id}`, user);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border p-8 w-full max-w-screen-lg">
        <h4 className="block font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-center text-white mb-2">
          Edit User
        </h4>
        <p className="block mt-1 font-sans text-xl antialiased font-normal leading-relaxed text-center text-white mb-8">
          Update user information in the Gym Management System
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="text"
              placeholder="Enter name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <select
              name="userType"
              value={user.userType}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            >
              <option value="">Select User Type</option>
              <option value="Member">Member</option>
              <option value="Trainer">Trainer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="number"
              placeholder="Enter height (cm)"
              name="height"
              value={user.height}
              onChange={handleChange}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="number"
              placeholder="Enter weight (kg)"
              name="weight"
              value={user.weight}
              onChange={handleChange}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="date"
              placeholder="Enter birthday"
              name="birthday"
              value={user.birthday}
              onChange={handleChange}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="text"
              placeholder="Enter Address"
              name="address"
              value={user.address}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)] flex items-center">
            <Checkbox
              id="isAdmin"
              name="isAdmin"
              checked={user.isAdmin}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isAdmin" className="text-white">Is Admin</label>
          </div>
        </form>

        

        <Button
          type="submit"
          onClick={handleSubmit}
          className="mt-10 block w-full rounded-lg bg-yellow-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
        >
          Update User
        </Button>
        <Button
            onClick={handleBack}
            className="mt-10 block w-full rounded-lg bg-yellow-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
            >
            Back to Dashboard
          </Button>
      </div>
    </div>
  );
};

export default EditUser;
