/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'flowbite-react';
import { HiChevronLeft, HiChevronRight, HiHome, HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import UserService from '../../Service/UserService';

const classes = "text-sm p-1 w-36 hover:bg-gray-300 dark:hover:bg-gray-500";
const TABLE_HEAD = [
    "ID",
    "KH Name", 
    "ENG Name", 
    "Gender", 
    "Phone Number", 
    "Email", 
    "Address",
    "Date of Birth",
    "Joined Date",
    "Role",
    // "QR Code",
    "Action",
];

const User = () => {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [searchEngName, setSearchEngName] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUser();
    }, [currentPage])

    const getAllUser = async () => {
        try {
            let url = `http://localhost:8081/api/users/page/${currentPage}`
            if (searchEngName) {
                url = `http://localhost:8081/api/users/engName?engName=${searchEngName}`
            }

            const response = await fetch(url)
            if(!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();

            if (searchEngName) {
                setUser(data)
                console.log(response)
            } else {
                setTotalPages(data.totalPages)
                setTotalItems(data.totalItems)
                setUser(data.user)
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data',error);
            setError('Failed to fetch data')
            setLoading(false);
        }
    }

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handlePageChange = (page) => setCurrentPage(page);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = 3;
        
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

    const deleteUser = async (id) => {
        if (id != null) {
            try {
                const response = await UserService.deleteUser(id);
                if (response.ok) {
                    getAllUser()
                } else {
                    throw new Error('Failed to delete supplier');
                }
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    const handleSearchEngNameInputChange = (event) => setSearchEngName(event.target.value);

    if (loading) {
        return (
            <div className='flex justify-center'>
                <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                    Loading . . . 
                </Typography>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex justify-center'>
                <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                    Error
                </Typography>
            </div>
        )
    }

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
                                User
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav>
            {/* <!-- End Breadcrumb --> */}
            <section className='mt-5 bg-white dark:bg-gray-700 relative shadow-2xl rounded-2xl overflow-hidden'>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-2">
                    <div className='w-auto xxs:max-w-full xs:max-w-96 sm:max-w-full xl:max-w-full'>
                        <div className="w-full">
                            <Typography className='text-left font-bold text-xl dark:text-gray-200'>
                                List Users
                            </Typography>

                            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                            {/*  Function Button */}
                            <div className='mt-10 flex flex-col'>
                                <div className='flex md:flex-row xxs:flex-col items-start'>
                                    <div className=' items-center xxs:w-full md:max-w-sm'>
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative w-full mb-2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
                                                <HiSearch className='text-black dark:text-gray-200'/>
                                            </div>
                                            <input type="text" id="simple-search" value={searchEngName} onChange={handleSearchEngNameInputChange} 
                                                className="dark:text-gray-200 bg-gray-50 border dark:bg-gray-600 border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm rounded-lg block w-80 xxs:w-full ps-10 h-9 " placeholder="Search Asset Code..." />
                                        </div>
                                    </div>                                          
                                </div>
                            </div>

                            <div>
                                <div className='xxs:w-full flex md:flex-row xxs:flex-col md:justify-start xxs:justify-evenly '>
                                    <div className="flex xxs:flex-row md:mr-2">
                                        <Button className='text-black dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm xxs:w-full md:w-36 mb-2 mr-2 hover:bg-gray-200 dark:hover:bg-gray-900' 
                                            href='/add-users'
                                        >
                                            <HiPlus className="mr-2 h-5 w-5" />
                                                Create
                                        </Button>
                                        <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2 dark:focus:ring-gray-500 dark:focus:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900' 
                                            href='/users/report'
                                        >
                                            <HiOutlineEye className="mr-2 h-5 w-5" />
                                                Preview
                                        </Button>
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
                                    {user && user
                                        .map(user => {
                                            return ( 
                                                <tr key={user.id} className={classes}>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="text-xs font-normal">
                                                            {user.id}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.khName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.engName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.gender}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.phoneNo}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.email}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.address}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.dob}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.startDate}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {user.role}
                                                        </Typography>
                                                    </td>
                                                    {/* <td className={classes}>
                                                        <div className='w-10 h-auto'>
                                                            <QRCode value={user.id} className='scale-50'/>
                                                        </div>
                                                    </td> */}
                                                   
                                                    <td className="text-sm">
                                                        <Dropdown label='Action' color='black' backgroundColor='gray' size="sm">
                                                            <Dropdown.Item href={`/users/view/${user.id}`} className='w-28'><HiOutlineEye className="mr-2 h-4 w-4" />View</Dropdown.Item>
                                                            <Dropdown.Item href={`/users/setting/${user.id}`} className='w-28'><HiOutlinePencilAlt className="mr-2 h-4 w-4" />Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteUser(user.id)} className='w-28'><HiOutlineTrash className="mr-2 h-4 w-4" />Delete</Dropdown.Item>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            );
                                        })} 
                                </tbody>
                            </table>
                        </div>
                        <Typography className='mt-5 mb-5 text-black dark:text-gray-200'>
                            Total Users: {totalItems}
                        </Typography>
                        <nav className="flex flex-col items-center justify-between space-y-3 md:flex-row md:items-start md:space-y-0" aria-label="Table navigation">
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <Link
                                        href="#"
                                        onClick={handlePrevPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                    <HiChevronLeft className='w-5 h-5'/>
                                    </Link>
                                </li>
                                    {renderPageNumbers()}
                                <li>
                                    <Link
                                        href="#"
                                        onClick={handleNextPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                    <HiChevronRight className='w-5 h-5'/>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
};

export default User
