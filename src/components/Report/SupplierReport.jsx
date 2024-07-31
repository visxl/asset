import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const classes = "h-12 w-48 text-sm hover:bg-gray-300 dark:hover:bg-gray-500";
const TABLE_HEAD = [
    "Asset ID", 
    "Asset", 
    "Model", 
    "Brand", 
    "Price", 
    "Date", 
    "User",
    "Supplier", 
    "Email", 
    "Phone Number", 
    "Address"
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
            const res = await fetch('http://localhost:8081/api/supplier/asset');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            return null;
        }
    };

    return (
        <>
            {/* <!-- Breadcrumb --> */}
            <nav className="flex px-5 py-3 mb-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
                            <Link to="/supplier" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Supplier
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <HiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-400'/>
                            <Link to="/supplier/report" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Preview
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav>
            {/* <!-- End Breadcrumb --> */}
            <div className="mt-5 bg-white dark:bg-gray-700 relative shadow-xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-3">
                    <div className='xxs:max-w-80 sm:max-w-full '>
                        <div className="md:w-full">
                            <Typography className='text-left font-bold text-xl text-black dark:text-gray-200'>
                                Asset And Supplier 
                            </Typography>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-black bg-white dark:bg-gray-700 dark:text-gray-200">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (
                                                <th key={index} className="bg-gray-100 dark:bg-gray-800">
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
