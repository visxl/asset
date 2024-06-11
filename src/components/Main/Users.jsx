/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';

import UserService from '../../Service/UserService';

    // Table thead
    const TABLE_HEAD = ["ID", "Name", "Email", "Phone Number", "Role", "Action"];
    const classes = "border border-solid text-sm p-1 hover:bg-gray-300";

    // Fetch data from backend
    const Users = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(0);
        const [totalItems, setTotalItems] = useState(0);
        const [user, setUser] = useState([]);

        const [error, setError] = useState()
        const navigate = useNavigate();

        useEffect(() => {
            getAllUser();
            },[currentPage]);

        const getAllUser = async () => {
            try {
                const response = await fetch(`http://192.168.1.94:3308/api/users/page/${currentPage}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);

                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Failed to fetch data", error)
            }
        };

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await UserService.deleteUser(userId);
                if (response.ok) {
                    navigate("/user")
                } else {
                    throw new Error('Failed to delete asset');
                }
            } catch (error) {
                console.error('The ID given must not be null', error);
            }
        }
    };

    return (
        <Card className='w-full rounded-xl p-3 shadow-lg'>
            <Typography className='text-left font-bold text-xl'>
                List Users
            </Typography>

            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
            {/* Button Link to add new asset page */}
            <div className='justify-start mt-10'>
                <Link to={'/add-users'} className='w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>
                    Add User
                </Link>
                <Link to={'/user/report'} className='w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>
                    Report
                </Link>
            </div>
            
            <div className="relative">
                <table className="w-full text-sm  text-black">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th key={index} className="border border-blue-gray-100 bg-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-sans"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.map(
                            (user) => {
                            return ( 
                                <tr key={user.id} className={classes}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.phoneNo}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.role}
                                        </Typography>
                                    </td>
                                    <td className="py-3 w-36">
                                        <Link className='w-28 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         to={`/users/profile/${user.id}`}>View</Link>
                                        {/* <Link className='w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         to={`/users/setting/${user.id}`}>Edit</Link> */}
                                         <Link className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         onClick={ () => deleteUser(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })} 
                    </tbody>
                </table>
            </div>
            <div className='pt-5 static'>
                <Typography>
                    Total Asset: {totalItems}
                </Typography>
                <div className='float-end -mt-10 flex align-middle justify-center'>
                    <button
                        disabled={currentPage === 1}
                        onClick={handleFirstPage}
                        className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                    >
                        First
                    </button>
                    <button disabled={currentPage === 1} onClick={handlePrevPage}
                        className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                    >
                        Previous
                    </button>
                    <Typography className='mt-4 p-2 pl-1'>{currentPage} / {totalPages}</Typography>
                    <button disabled={currentPage === totalPages} onClick={handleNextPage}
                        className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                    >
                        Next
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={handleLastPage}
                        className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                        Last
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default Users;
