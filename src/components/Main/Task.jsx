/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import TaskService from '../../Service/TaskService';
// import { format } from 'date-fns';


    // Table thead
    const TABLE_HEAD = ["ID", "Problem", "Solution", "Request By", "Date", "From time", "To Time", "Status", "Action"];
    const classes = "border border-solid text-sm p-1 hover:bg-gray-300";

    // Fetch data from backend
    const Task = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(0);
        const [totalItems, setTotalItems] = useState(0);
        const [task, setTask] = useState([]);

        const [error, setError] = useState()
        const navigate = useNavigate();

        useEffect(() => {
            getAllTask();
            },[currentPage]);
        const getAllTask = async () => {
            
            try {
                const response = await fetch(`http://192.168.1.94:3308/api/task/page/${currentPage}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);

                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
                setTask(data.task);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Failed to fetch data", error)
            }
        };

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.toLocaleDateString()}`;
      };

    const deleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await TaskService.deleteTask(taskId);
                if (response.ok) {
                    navigate("/task")
                } else {
                    throw new Error('Failed to delete asset');
                }
            } catch (error) {
                console.error('The ID given must not be null', error);
            }
        }
    };

    return (
        <Card className='w-full rounded-xl p-3 shadow-lg'>
            <Typography className='text-left font-bold text-xl'>
                List Task
            </Typography>

            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
            {/* Button Link to add new asset page */}
            <div className='flex flex-col md:flex-row mt-10'>
                <Link to={'/add-task'} className='w-auto md:w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                    Add Task
                </Link>
                {/* <Link to={'/asset/report'} className='w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>
                    Report
                </Link> */}
                <input className='w-full md:w-64 focus:outline-none text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                    type="date" 
                    placeholder="Search by Code" 
                />
            </div>
            
            <div className="relative">
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
                        {task && task
                            .map(
                            (task) => {
                                return ( 
                                <tr key={task.id} className={classes}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.problem}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.solution}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.reqBy}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {formatDate(task.date)}
                                            {/* {task.date} */}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.fromTime}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.toTime}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {task.status}
                                        </Typography>
                                    </td>
                                    <td className="py-3 w-36">
                                        {/* <Link className='w-28 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         to={`/task/${user.id}`}>View</Link> */}
                                        <Link className='w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         to={`/edit-task/${task.id}`}>Edit</Link>
                                         <Link className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                         onClick={ () => deleteTask(task.id)}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })} 
                    </tbody>
                </table>
            </div>
            <div className='pt-5 static'>
                <Typography>
                    Total Task: {totalItems}
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
        </Card>
    );
}

export default Task;
