import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { Card, Typography } from '@material-tailwind/react';

const AddUsers = () => {
  const [khName, setKhName] = useState('')
  const [engName, setEngName] = useState('');
  const [role, setRole] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();

    const user = { engName, khName, role, phoneNo, email, password };

    console.log('User data to be sent:', user);

    UserService.createUser(user)
      .then((response) => {
        console.log('User created successfully:', response.data);
        navigate('/users');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setError('Failed to create user. Please try again.');
      });
  };

  return (
    <Card className='w-full h-screen rounded-xl p-5 pb-32 shadow-lg overflow-scroll'>
      <Typography className="text-xl font-bold mb-6">
        Create New User
      </Typography>

      {error && (
        <Typography className="text-red-500 mb-4">
          {error}
        </Typography>
      )}

      <form className="max-w-screen-2xl grid grid-cols-4 gap-6 p-5" onSubmit={saveUser}>
        <div className="col-span-2">
          <Typography className="text-lg mb-1">
            English Name:
          </Typography>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={engName}
            onChange={(e) => setEngName(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Typography className="text-lg mb-1">
            Khmer Name:
          </Typography>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={khName}
            onChange={(e) => setKhName(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Typography className="text-lg mb-1">
            Role:
          </Typography>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Typography className="text-lg mb-1">
            Email:
          </Typography>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Typography className="text-lg mb-1">
            Phone Number:
          </Typography>
          <input
            type="tel"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Typography className="text-lg mb-1">
            Password:
          </Typography>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        <div className="sm:col-span-2 py-3">
          <button type="submit" className='w-28 mt-6 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
            Save
          </button>
          <Link to="/users" className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>
            Cancel
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default AddUsers;
