/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";


import LOGOJPG from '../asset/Banner.jpg'
import AssetService from '../../Service/AssetService';
import { Link } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

    // Table thead
    const TABLE_HEAD = ["ID", "Name", "Asset Name", "Model", "Brand", "Code", "Price($)", "Value", "Purchase Date", "Condition", "User", "Other","Office",
        // "PC Name"
    ];
    const classes = "border border-solid text-sm p-1";

    // Fetch data from backend
    const AssetReport = () => {
    const [asset, setAssets] = useState([]);

    useEffect(() => {
        AssetService.getAllAsset()
            .then(response => {
                setAssets(response.data);
            })
            .catch(error => {
                console.error('Error fetching Asset:', error);
            });
        }, 
    []);

    return (
        <>
        {/* <!-- Breadcrumb --> */}
        <nav className="flex px-5 py-3 mb-10 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <HiHome className='mr-2'/>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <HiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-400'/>
                            <Link to="/asset" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Asset
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <HiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-400'/>
                            <Link to="/asset/report" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Preview
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav>
            {/* <!-- End Breadcrumb --> */}
            <div className="relative">
                <img src={LOGOJPG} alt='logo'/>
                <Typography className='text-center text-2xl font-semibold ' >
                    បញ្ជីគ្រប់គ្រងទ្រព្យសម្បត្តិក្រុមហ៊ុន ត្រឹមថ្ងៃទី ៣១ - មិថុនា - ២០២៤
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
                        {asset && asset
                        .map(asset => {
                                return ( 
                                    <tr key={asset.id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal w-32">
                                                {asset.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.assetName}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.model}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.brand}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.code}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.value}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.condition}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.user}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.other}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.office}
                                            </Typography>
                                        </td>
                                        {/* <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.pcName}
                                            </Typography>
                                        </td> */}
                                    </tr>
                                );
                            }
                        )} 
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AssetReport;
