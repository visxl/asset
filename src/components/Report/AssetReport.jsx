/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";


import LOGOJPG from '../asset/Banner.jpg'
import AssetService from '../../Service/AssetService';

    // Table thead
    const TABLE_HEAD = ["ID", "Name", "Asset Name", "Model", "Brand", "Code", "Price", "Value", "Purchase Date", "Condition", "User", "Other","Office","PC Name"];
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
        <Card className='w-full rounded-xl p-5 shadow-lg'>
            <div className="relative">
                <img src={LOGOJPG} alt='logo'/>
                <Typography className='text-center text-2xl font-semibold ' >
                    បញ្ជីគ្រប់គ្រងទ្រព្យសម្បត្តិក្រុមហ៊ុន ត្រឹមថ្ងៃទី ៣១ - ធ្នូ - ២០២៣
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
                                                {asset.assetname}
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
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asset.pcname}
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

export default AssetReport;
