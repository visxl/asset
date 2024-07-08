import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SupplierService from '../../Service/SupplierService';

const classes = "border border-solid text-sm p-1 hover:bg-gray-300";
const TABLE_HEAD = ["Supplier", "Email", "Phone Number", "Address", "Action"];

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
            const res = await fetch('http://192.168.137.14:3308/api/supplier');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            return null;
        }
    };

    const deleteSupplier = async (id) => {
        if (id != null) {
            try {
                const response = await SupplierService.deleteSupplier(id);
                if (response.ok) {
                    getAllSupplier();
                } else {
                    throw new Error('Failed to delete supplier');
                }
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    return (
        <>
            <div className="mt-5 bg-white dark:bg-gray-800 relative shadow-xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className='xxs:max-w-80 sm:max-w-full '>
                        <div className="md:w-full">
                            <Typography className='text-left font-bold text-xl'>
                                List Supplier
                            </Typography>
                            <div className='flex flex-col md:flex-row mt-10'>
                                <Link to={'/add-supplier'} className='xxs:w-full md:w-36 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                    Add Supplier
                                </Link>
                                {/* <Link to={'/asset/report'} className='w-auto md:w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                    Report
                                </Link> */}
                            </div>
                            <div className="relative overflow-x-auto">
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
                                        {suppliers && suppliers.map(supplier => (
                                            <tr key={supplier.id} className={classes}>
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
                                                <td className="flex">
                                                    {/* <Link className='w-20 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5 me-2 mb-2 '
                                                        to={`/supplier/view/${supplier.id}`}>View
                                                    </Link> */}
                                                    <Link className='w-20 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5 me-2 mb-2 '
                                                        to={`/edit-supplier/${supplier.id}`}>Edit
                                                    </Link>
                                                    <button className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-300 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5 me-2 mb-2 '
                                                        onClick={() => deleteSupplier(supplier.id)} >Delete
                                                    </button>
                                                </td>
                                            </tr>
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
