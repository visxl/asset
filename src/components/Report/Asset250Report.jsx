/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import LOGOJPG from '../asset/Banner.jpg'
import Asset250Service from '../../Service/Asset250Service';

    // Table thead
    const TABLE_HEAD = ["ID", "Name", "Model", "Brand", "Code", "Price($)", "Value", "Purchase Date", "Condition", "User", "Office","Department"];
    const classes = "border border-solid text-sm p-1";

    // Fetch data from backend
    const Asset250Report = () => {
    const [asset250, setAssets250] = useState([]);

    useEffect(() => {
        Asset250Service.getAllAsset250()
            .then(response => {
                setAssets250(response.data);
            })
            .catch(error => {
                console.error('Error fetching Department:', error);
            });
        }, 
    []);

    return (
            <div className="relative p-5">
                <img src={LOGOJPG} alt='logo'/>
                <Typography className='text-center text-2xl font-semibold ' >
                    បញ្ជីគ្រប់គ្រងទ្រព្យសម្បត្តិក្រុមហ៊ុន ត្រឹមថ្ងៃទី ៣១ - ធ្នូ - ២០២៣
                </Typography>
                <table className="w-full text-sm  text-black ">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th key={index} className="border border-blue-gray-100 bg-blue-gray-50">
                                    <Typography  className="font-sans text-sm">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {asset250 && asset250
                        .map(asset250 => {
                                return ( 
                                    <tr key={asset250.id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal w-32">
                                                {asset250.name}
                                            </Typography>
                                        </td>
                                        {/* <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.assetname}
                                            </Typography>
                                        </td> */}
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.model}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.brand}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.code}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.value}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.condition}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.user}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.office}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.department}
                                            </Typography>
                                        </td>
                                        {/* <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset250.type}
                                            </Typography>
                                        </td> */}
                                    </tr>
                                );
                            }
                        )} 
                    </tbody>
                </table>
            </div>
    );
}

export default Asset250Report;
