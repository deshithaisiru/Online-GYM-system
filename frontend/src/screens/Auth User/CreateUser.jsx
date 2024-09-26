import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../../components/input';
import { Checkbox } from '../../components/checkbox';
import { Button } from '../../components/button';

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    mobile: '',
    height: '',
    weight: '',
    birthday: '',
    address: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');
  const [age, setAge] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'birthday') {
      const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
      setUser({ ...user, [name]: formattedDate });
      
      if (value) {
        const birthDate = new Date(value);
        const calculatedAge = new Date().getFullYear() - birthDate.getFullYear();
        const monthDiff = new Date().getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
          setAge(calculatedAge - 1);
        } else {
          setAge(calculatedAge);
        }
      } else {
        setAge('');
      }
    } else {
      setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...userWithoutConfirmPassword } = user;
      await axios.post('/api/users/create', userWithoutConfirmPassword);
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while creating the user.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border p-8 w-full max-w-screen-lg">
        <h4 className="block font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-center text-white mb-2">
          Create New Client
        </h4>
        <p className="block mt-1 font-sans text-xl antialiased font-normal leading-relaxed text-center text-white mb-8">
          Add a new client to the Gym Management System
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
            <Input
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <Input
              type="text"
              placeholder="Enter Adddress"
              name="address"
              value={user.address}
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
            {age && <p className="text-white mt-2">Age: {age} years</p>}
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
          Create User
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

export default CreateUser;