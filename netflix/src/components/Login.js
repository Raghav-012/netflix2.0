import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (isLogin) {
      // LOGIN
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (res?.data?.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate('/browse');
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      // REGISTER
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (res?.data?.success) {
          toast.success(res.data.message);
          setIsLogin(true); // switch to login after signup
        } else {
          toast.error("Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error?.response?.data?.message || "Signup failed");
      } finally {
        dispatch(setLoading(false));
      }
    }

    // Clear form
    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
  <Header />
  <div className='absolute inset-0'>
    <img
      className='w-full h-full object-cover'
      src='https://th.bing.com/th/id/R.57d2c2cd76f1670cf34b6d96095b9e79?rik=zkD5pQ5cjamq%2bg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1945909.jpg&ehk=2vyLV1bZjiSusdkGqGM0c2xZSQy%2fATmJQaHV8KAmxq0%3d&risl=1&pid=ImgRaw&r=0'
      alt='streamify-background'
    />

  </div>
  <form
    onSubmit={getInputData}
    className='flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto items-center justify-center absolute rounded-lg bg-blue-900 bg-opacity-90 shadow-2xl'
  >
    <h1 className='text-3xl text-white mb-5 font-bold tracking-wide'>
      {isLogin ? 'Login' : 'Signup'}
    </h1>
    <div className='flex flex-col w-full'>
      {!isLogin && (
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type='text'
          placeholder='Full Name'
          className='outline-none p-3 my-2 rounded-md bg-white text-blue-900 placeholder-gray-500 shadow-sm'
          required
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        placeholder='Email'
        className='outline-none p-3 my-2 rounded-md bg-white text-blue-900 placeholder-gray-500 shadow-sm'
        required
      />
      <input
        value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
          className='outline-none p-3 my-2 rounded-md bg-white text-blue-900 placeholder-gray-500 shadow-sm'
          required
      />
      <button
        type='submit'
        className='bg-gradient-to-r from-blue-600 to-blue-400 mt-6 p-3 text-white rounded-md font-semibold hover:from-blue-700 hover:to-blue-500 transition shadow-md'
      >
        {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
      </button>
      <p className='text-white mt-3 text-sm'>
        {isLogin ? 'New to Streamify?' : 'Already have an account?'}
        <span
          onClick={loginHandler}
          className='ml-1 text-yellow-300 font-bold cursor-pointer hover:underline'
        >
          {isLogin ? 'Signup' : 'Login'}
        </span>
      </p>
    </div>
  </form>
</div>

  );
};

export default Login;
