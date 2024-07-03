import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SupplierService from '../../Service/SupplierService';

const classes = "border border-solid text-sm p-1 hover:bg-gray-300";
const TABLE_HEAD = ["Supplier", "Email", "Phone Number", "Address", "Action"];

const SupplierTable = () => {
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
            const res = await fetch('http://localhost:8081/api/supplier');
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
                    throw new Error('Failed to delete asset');
                }
            } catch (error) {
                console.error('The ID given must not be null', error);
            }
        }
    };
    

    return (
        <body>
            <section>
                <Card className='w-full rounded-xl p-3 h-full shadow-lg'>
                    <Typography className='text-left font-bold text-xl'>
                        List Supplier
                    </Typography>
                    <div className='flex flex-col md:flex-row mt-10'>
                        <Link to={'/add-supplier'} className='w-auto md:w-36 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
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
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {supplier.name}
                                    </Typography>
                                    </td>
                                    <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {supplier.email}
                                    </Typography>
                                    </td>
                                    <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {supplier.number}
                                    </Typography>
                                    </td>
                                    <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {supplier.address}
                                    </Typography>
                                    </td>
                                    <td className="py-3">
                                    <Link
                                        className="w-28 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                        to={`/supplier/view/${supplier.id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                        to={`/edit-supplier/${supplier.id}`}
                                    >
                                        Edit
                                    </Link>
                                    
                                    <Link
                                        className="w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                        onClick={() => deleteSupplier(supplier.id)}
                                    >
                                        Delete
                                    </Link>
                                   
                                    </td>
                                </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </body>
    );
};

export default SupplierTable;
