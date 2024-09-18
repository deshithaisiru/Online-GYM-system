import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      // Redirect based on user type or admin status
      if (userInfo.isAdmin) {
        navigate('/admin-dashboard');
      } else if (userInfo.userType === 'Trainer') {
        navigate('/trainer-dashboard');
      } else if (userInfo.userType === 'Member') {
        navigate('/member-dashboard');
      } else {
        navigate('/'); // Fallback or home page if no userType found
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      // Perform immediate redirect based on the returned user info
      if (res.isAdmin) {
        navigate('/admin-dashboard');
      } else if (res.userType === 'Trainer') {
        navigate('/trainer-dashboard');
      } else if (res.userType === 'Member') {
        navigate('/member-dashboard');
      } else {
        navigate('/'); // Fallback or home page
      }

      toast.success('Login Successful!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Sign In</h1>

      <form onSubmit={submitHandler}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email Address
          </label>
          <input
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
        >
          Sign In
        </button>
      </form>

      {isLoading && <Loader />}

      <div className='py-3 text-center'>
        <p>
          New Customer?{' '}
          <Link to='/register' className='text-blue-500 hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
