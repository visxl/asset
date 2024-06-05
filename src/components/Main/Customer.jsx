/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomerService from '../../Service/CustomerService';

const TABLE_HEAD = ["ID", "Fullname","Email","Address","Phone Number","Policy Number","Type","Action"];
const classes = "border border-solid text-sm py-3 hover:bg-gray-300";

const Customer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [customer, setCustomer] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    const [error, setError] = useState()

    useEffect(() => {
        getAllCustomer();
        }, 
    [],[currentPage]);

    const getAllCustomer = async () => {
        try {
            const response = await fetch(`http://192.168.1.94:3308/api/customer/page/${currentPage}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            console.log(data);

            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
            setCustomer(data.customer);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Failed to fetch data", error)
        }
    }

    // const getAllCustomer = async () => {
    //     try {
    //         let url = `http://localhost:8081/api/customer/page/${currentPage}`;
    //         if (search) {
    //             url = `http://localhost:8081/api/customer/filter?fullName=${search}`;
    //         }
    
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data = await response.json();

    //         if (search) {
    //             setCustomer(data);
    //         } else {
    //             setTotalPages(data.totalPages);
    //             setTotalItems(data.totalItems);
    //             setCustomer(data.asset);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setError("Failed to fetch data", error)
    //     }
    // };

    // const handleSearchInputChange = (event) => {
    //     setSearch(event.target.value);
    // };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleFirstPage = () => {
        setCurrentPage(1);
    }

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    }

    const deleteCustomer = (customerId) => {
        if (window.confirm('Are you sure you want to delete this?'))
        CustomerService.deleteCustomer(customerId)
        .then((response) => {
            setCustomer(response.data)
            navigate('/customer');
        }).catch((error) => {
            console.error('Error' , error)
        })
    }

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://192.168.1.94:3308/api/customer/filter?fullName=${search}`);
            if (!response.ok) {
                throw new Error('Failed to search Customer');
            }
            const data = await response.json();
            setCustomer(data);
        } catch (error) {
            console.error('Error searching Customer:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
    };
    
    return (
        <Card className='w-full rounded-xl p-5 shadow-lg'>
            <Typography className='text-left font-bold text-xl'>
                List Customer
            </Typography>
                {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
            {/* Button Link to add new department page */}
            <div className='flex mt-10'> 
                <Link to={'/add-customer'} className='w-36 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                    Add Customer
                </Link>
                <input className='w-64 focus:outline-none text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                    type="text" value={search} 
                    onChange={handleSearchInputChange} 
                    placeholder="Search by fullname" 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-black">
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
                        {customer
                        .map(
                            (customer) => {
                            return (
                                <tr key={customer.id} className={classes}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.fullName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.address}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.phoneNumber}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.policyNumber}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer.type}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Link className='w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                            to={`/edit-customer/${customer.id}`}>Edit</Link>
                                        <Link className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         onClick={ () => deleteCustomer(customer.id)}>Delete</Link>
                                    </td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className='pt-5 static'>
                        <Typography>
                            Total Customer : {totalItems}
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
            </div>
        </Card>
    )
}

export default Customer