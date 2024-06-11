/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";

import LOGOJPG from '../asset/Banner.jpg'
import UserService from '../../Service/UserService';

    // Table thead
    const TABLE_HEAD = ["ID", "Name", "Email", "Phone Number"];
    const classes = "border border-solid text-sm p-1";

    // Fetch data from backend
    const UserReport = () => {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUser()
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching User:', error);
            });
        }, 
    []);

    return (
        <Card className='w-full rounded-xl p-5 shadow-lg'>
            <div className="relative">
                <img src={LOGOJPG} alt='logo'/>
                <Typography className='text-center text-2xl font-semibold ' >
                    បញ្ជីអ្នកប្រើប្រាស់ ត្រឹមថ្ងៃទី ៣១ - ធ្នូ - ២០២៣
                </Typography>
                <table className="w-full text-sm  text-black ">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th key={index} className="border border-blue-gray-100 bg-blue-gray-50">
                                    <Typography variant="small" color="blue-gray"  className="font-san">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {user && user
                        .map(user => {
                                return ( 
                                    <tr key={user.id}>
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
                                    </tr>
                                );
                            }
                        )} 
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default UserReport;
