/* eslint-disable no-unused-vars */
import { Card, Typography } from '@material-tailwind/react';
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { HiArrowCircleRight, HiLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LOGO from "../asset/Logo.png"

const Login = () => {
  const [engName, setEngName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.137.14:3308/api/userlogin');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const users = await response.json();
      const user = users.find((u) => u.engName === engName && u.password === password);

      if (user) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('user_id', user.id);
            navigate('/');

            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: true,
              timer: 1500,
            });
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect Username or Password.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch user data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white rounded-2xl">
        <div className='flex justify-center pt-5'>
          <img src={LOGO} alt='logo' className='w-64'/>
          {/* <Typography className='text-center text-2xl font-bold text-black mt-5'>
            SignIn
          </Typography> */}
        </div>
        
        <form className="w-full self-center p-6" onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              value={engName}
              onChange={(e) => setEngName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              id="password"
              placeholder='***'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <Button 
            type="submit" 
            value="login" 
            className="text-black text-sm w-full mb-2 focus:ring-gray-600 hover:bg-gray-200" 
          >
            <span>Sign In</span><HiArrowCircleRight className='w-5 h-5 ml-3'/>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
