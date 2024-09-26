import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ResetPasswordScreen = () => {
  const { token } = useParams(); // Token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border p-8 mb-20 w-full max-w-md">
        <h4 className="text-4xl font-semibold text-center text-white">Reset Password</h4>
        <p className="mt-2 text-lg font-normal text-center text-white">
          Enter your new password below.
        </p>

        <form onSubmit={submitHandler} className="mt-8 flex flex-col gap-6">
          <div className="relative h-11 w-full">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>

          <div className="relative h-11 w-full">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 block w-full rounded-lg bg-yellow-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
          >
            Reset Password
          </button>
        </form>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
