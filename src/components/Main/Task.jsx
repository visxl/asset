/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import TaskService from '../../Service/TaskService';
import { Button, Dropdown } from 'flowbite-react';
import { HiCalendar, HiChevronLeft, HiChevronRight, HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from 'react-icons/hi';

// Table thead
const TABLE_HEAD = ["ID", "Problem", "Solution", "Request By", "Date", "From time", "To Time", "Status", "Action"];
const classes = "text-sm p-1 hover:bg-gray-300 dark:hover:bg-gray-500";

// Fetch data from backend
const Task = () => {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ totalItems, setTotalItems ] = useState(0)
    const [ task, setTask ] = useState([])
    const [ error, setError ] = useState()

    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getAllTask()
    }, [currentPage])

    const getAllTask = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/task/page/${currentPage}`);
            // const response = await fetch(`http://192.168.137.14:3308/api/task/page/${currentPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();

            console.log(data)

            setTotalPages(data.totalPages)
            setTotalItems(data.totalItems)
            setTask(data.task)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setError("Failed to fetch data", error)
            setLoading(false)
        }
    };

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handlePageChange = (page) => setCurrentPage(page);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = 2;

        for (let i = 1; i <= visiblePages; i++) {
            pageNumbers.push(i);
        }
        if (currentPage > visiblePages + 1) {
            pageNumbers.push('...');
        }
        for (let i = Math.max(visiblePages + 1, currentPage - 1); i <= Math.min(totalPages - visiblePages, currentPage + 1); i++) {
            pageNumbers.push(i);
        }
        if (currentPage < totalPages - visiblePages) {
            pageNumbers.push('...');
        }
        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
            if (i > visiblePages) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers.map((number, index) => (
            <li key={index}>
                {number === '...' ? (
                    <span className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</span>
                ) : (
                    <Link
                        to="#"
                        onClick={() => handlePageChange(number)}
                        className={`flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                    >
                        {number}
                    </Link>
                )}
            </li>
        ));
    };

    const deleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await TaskService.deleteTask(taskId);
                if (response.ok) {
                    navigate("/task");
                } else {
                    throw new Error('Failed to delete task');
                }
            } catch (deleteError) {
                console.error('The ID given must not be null', deleteError);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.toLocaleDateString()}`;
    };

    const formatTime = (timeString) => {
        if (!timeString) {
            return 'N/A';
        }

        const [hours, minutes, seconds] = timeString.split(':');
        const date = new Date();
        date.setHours(hours, minutes, seconds.split('.')[0]);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    if (loading) {
        return (
            <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                Loading . . . 
            </Typography>
        )
    }

    if (error) {
        return (
            <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                Error 404
            </Typography>
        )
    }

    return (
        <div>
            <section className='mt-5 bg-white dark:bg-gray-700 relative shadow-2xl rounded-2xl overflow-hidden'>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-2">
                    <div className='w-auto xxs:max-w-full xs:max-w-96 sm:max-w-full xl:max-w-full'>
                        <div className="w-full">
                            <Typography className='text-left font-bold text-xl dark:text-gray-200'>
                                List Task
                            </Typography>
                                    
                            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                            
                            <div className='mt-10 flex flex-col'>
                                <div className='flex md:flex-row xxs:flex-col items-start'>
                                    <div className=' items-center xxs:w-full md:max-w-sm'>
                                        {/* Search */}
                                        <div class="relative max-w-sm mt-2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                <HiCalendar className='text-black dark:text-gray-200'/>
                                            </div>
                                            <input Datepicker type="text" className="dark:text-gray-200 bg-gray-50 border dark:bg-gray-600 border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm rounded-lg block w-80 xxs:w-full ps-10 h-9 " 
                                                placeholder="Search date" 
                                            />
                                        </div>
                                        {/* Search end */}
                                        {/* Function Button */}
                                        <div className='flex md:flex-row xxs:justify-between md:justify-start w-full xxs:gap-2 md:gap-0 mt-2'>
                                            <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2 mr-2' href='/add-task'>
                                                <HiPlus className="mr-2 h-5 w-5" />
                                                Create
                                            </Button>
                                            <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2' href='/task/report'>
                                                <HiOutlineEye className="mr-2 h-5 w-5" />
                                                Preview
                                            </Button>
                                        </div>
                                        {/* End Function Button */}
                                    </div>                                          
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="overflow-x-auto text-black bg-white dark:bg-gray-700 dark:text-gray-200">
                                <thead>
                                    <tr > 
                                        {TABLE_HEAD.map((head, index) => (
                                            <th key={index} className="border-none bg-gray-100 dark:bg-gray-800">                                                            
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
                                    {task && task.map((task) => (
                                        <tr key={task.id} className={classes}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {task.id}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {task.problem}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {task.solution}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {task.reqBy}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {formatDate(task.date)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {formatTime(task.fromTime)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal text-sm">
                                                    {formatTime(task.toTime)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-sm"
                                                    style=
                                                    {{
                                                        padding: '5px',
                                                        borderRadius: '4px',
                                                        color: task.status ? 'black dark:text-gray-200' : 'red', 
                                                    }}
                                                >
                                                    {task.status ? 'Complete' : 'Pending'}
                                                </Typography>
                                            </td>
                                            <td className="text-sm hover:bg-gray-500">
                                                <Dropdown label='Action' color='black' backgroundColor='gray' size="sm">
                                                    <Dropdown.Item href={`/task/view/${task.id}`} className='w-28'><HiOutlineEye className="mr-2 h-4 w-4" />View</Dropdown.Item>
                                                    <Dropdown.Item href={`/edit-task/${task.id}`} className='w-28'><HiOutlinePencilAlt className="mr-2 h-4 w-4" />Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => deleteTask(task.id)} className='w-28'><HiOutlineTrash className="mr-2 h-4 w-4" />Delete</Dropdown.Item>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Typography className='mt-5 mb-5 text-black dark:text-gray-200'>
                            Total Asset: {totalItems}
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
        </div>
    );
};

export default Task;
