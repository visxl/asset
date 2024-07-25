import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

const classes = "border border-solid text-sm p-1 hover:bg-gray-300 dark:hover:bg-gray-500";
const TABLE_HEAD = [
    
    "Supplier", 
    "Email", 
    "Phone Number", 
    "Address",
    "Asset ID", 
    "Asset", 
    "Model", 
    "Brand", 
    "Price", 
    "Date", 
    "User"
];

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const data = await getAllSupplier();
            if (data) {
                setSuppliers(data);
            }
        };
        fetchSuppliers();
    }, []);

    const getAllSupplier = async () => {
        try {
            const res = await fetch('http://192.168.137.14:3308/api/supplier/asset');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            return null;
        }
    };

    return (
        <>
            <div className="mt-5 bg-white dark:bg-gray-800 relative shadow-xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className='xxs:max-w-80 sm:max-w-full '>
                        <div className="md:w-full">
                            <Typography className='text-left font-bold text-xl text-black dark:text-gray-200'>
                                Asset And Supplier 
                            </Typography>
                            
                            <div className="pr-5 overflow-x-auto">
                                <table className="w-auto xl:w-full text-black bg-white dark:bg-gray-700 dark:text-gray-200">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (
                                                <th key={index} className="border border-blue-gray-100 bg-gray-100 dark:bg-gray-800">
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
                                        {suppliers && suppliers.map(supplier => (
                                            supplier.assets.length > 0 && supplier.assets.map(asset => (
                                                <tr key={asset.id} className={classes}>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {supplier.name}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {supplier.email}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {supplier.number}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {supplier.address}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.id}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.assetName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.model}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.brand}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.price}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.date}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {asset.user}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Supplier;
