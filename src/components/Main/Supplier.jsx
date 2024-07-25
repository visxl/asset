/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import SupplierService from '../../Service/SupplierService';
import { Button, Dropdown } from 'flowbite-react';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const classes = "border border-solid text-sm p-1 hover:bg-gray-300 dark:hover:bg-gray-500";
const TABLE_HEAD = [
    "ID",
    "Supplier", 
    "Email", 
    "Phone Number", 
    "Address", 
    "Action"
];

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [searchName, setSearchName] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
        getAllSupplier();
    }, [currentPage])

    const getAllSupplier = async () => {
        try {
            let url = `http://192.168.137.14:3308/api/supplier/page/${currentPage}`
            if (searchName) {
                url = `http://192.168.137.14:3308/api/supplier/name?name=${searchName}`
            }

            const response = await fetch(url)
            if(!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();

            if (searchName) {
                setSuppliers(data)
            } else {
                setTotalPages(data.totalPages)
                setTotalItems(data.totalItems)
                setSuppliers(data.suppliers)
            }
        } catch (error) {
            console.error('Error fetching data',error);
            setError('Failed to fetch data')
        }
    }

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handlePageChange = (page) => setCurrentPage(page);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = 2;
        
        for (let i = 1; i <= totalPages; i++) {
        if (i <= visiblePages || i > totalPages - visiblePages || Math.abs(i - currentPage) < visiblePages) {
            pageNumbers.push(i);
        } else if (i === visiblePages + 1 || i === totalPages - visiblePages) {
            pageNumbers.push('...');
        }
        }
        
        return pageNumbers.map((number, index) => (
        <li key={index}>
            {number === '...' ? (
            <span className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</span>
            ) : (
            <Link
                href="#"
                onClick={() => handlePageChange(number)}
                className={`flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
            >
                {number}
            </Link>
            )}
        </li>
        ));
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

    const handleSearchNameInputChange = (event) => setSearchName(event.target.value);

    return (
        <>
            <div className="mt-5 bg-white dark:bg-gray-800 relative shadow-xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className='xxs:max-w-80 sm:max-w-full '>
                        <div className="md:w-full">
                            <Typography className='text-left font-bold text-xl text-black dark:text-gray-200'>
                                List Supplier
                            </Typography>

                            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                            {/*  Function Button */}
                            <div className='mt-10 flex flex-col'>
                                <div className='flex md:flex-row xxs:flex-col items-start'>
                                    <div className=' items-center xxs:w-full md:max-w-sm'>
                                        <label className="sr-only">Search</label>
                                            <div className="relative w-full mb-2">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
                                                    <HiSearch className='text-black dark:text-gray-200'/>
                                                </div>
                                                <input type="text" id="simple-search" value={searchName} onChange={handleSearchNameInputChange} 
                                                    className="bg-gray-50 border dark:bg-gray-600 text-black dark:text-gray-200 border-gray-300 text-sm rounded-lg block w-full ps-10 h-9 " placeholder="Search Supplier Name..." />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='xxs:w-full flex md:flex-row xxs:flex-col md:justify-start xxs:justify-evenly '>
                                            <div className="xxs:flex xxs:flex-wrap">
                                                <div className='flex md:flex-col xxs:justify-between w-full xxs:gap-2 md:gap-0'>
                                                    <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2' href='/add-supplier'>
                                                        <HiPlus className="mr-2 h-5 w-5" />
                                                        Create New
                                                    </Button>
                                                    <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2' href='/supplier/report'>
                                                        <HiOutlineEye className="mr-2 h-5 w-5" />
                                                        Preview
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                          
                                </div>
                            </div>
                            {/* End Function Button */}
                            
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
                                        {suppliers && suppliers
                                            .map(suppliers => {
                                                return ( 
                                                    <tr key={suppliers.id} className={classes}>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="text-xs font-normal">
                                                                {suppliers.id}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                {suppliers.name}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                {suppliers.email}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                {suppliers.number}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                {suppliers.address}
                                                            </Typography>
                                                        </td>
                                                       
                                                        <td className="border border-solid text-sm">
                                                            <Dropdown label='Action' color='black' backgroundColor='gray' size="sm">
                                                                <Dropdown.Item href={`/supplier/view/${suppliers.id}`} className='w-28'><HiOutlineEye className="mr-2 h-4 w-4" />View</Dropdown.Item>
                                                                <Dropdown.Item href={`/edit-supplier/${suppliers.id}`} className='w-28'><HiOutlinePencilAlt className="mr-2 h-4 w-4" />Edit</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => deleteSupplier(suppliers.id)} className='w-28'><HiOutlineTrash className="mr-2 h-4 w-4" />Delete</Dropdown.Item>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                );
                                            })} 
                                    </tbody>
                                </table>
                            </div>
                            <Typography className='mt-5 mb-5 text-black dark:text-gray-200'>
                                Total Asset Under 250: {totalItems}
                            </Typography>
                            <nav className="flex flex-col items-center justify-between space-y-3 md:flex-row md:items-start md:space-y-0" aria-label="Table navigation">
                                <ul className="inline-flex items-stretch -space-x-px">
                                    <li>
                                        <Link
                                        href="#"
                                        onClick={handlePrevPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        </Link>
                                    </li>
                                        {renderPageNumbers()}
                                    <li>
                                        <Link
                                        href="#"
                                        onClick={handleNextPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default Supplier;
