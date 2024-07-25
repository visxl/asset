import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";

import LOGOJPG from '../asset/Banner.jpg';
import TaskService from '../../Service/TaskService';

// Table thead
const TABLE_HEAD = [
    "ID", 
    "Problem", 
    "Solution", 
    "Request By", 
    "Date", 
    "From Time", 
    "To Time", 
    "Status"
];

const classes = "border border-solid text-sm p-1";

// Fetch data from backend
const TaskReport = () => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        TaskService.getAllTask()
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Asset:', error);
                setError('Error fetching tasks');
                setLoading(false);
            });
    }, []);

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
        return <Typography className="text-center text-2xl">Loading...</Typography>;
    }

    if (error) {
        return <Typography className="text-center text-2xl text-red-600">{error}</Typography>;
    }

    return (
        <div className="relative">
            <img src={LOGOJPG} alt='logo' />
            <Typography className='text-center text-2xl font-semibold'>
                របាយការណ៍ការងារប្រចាំថ្ងៃ
            </Typography>
            <table className="w-full text-sm text-black">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th key={index} className="border border-blue-gray-100 bg-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-san">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {task && task.map(task => (
                        <tr key={task.id}>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {task.id}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {task.problem}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {task.solution}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {task.req_by}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {formatDate(task.date)}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {formatTime(task.fromTime)}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {formatTime(task.toTime)}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs"
                                    style={{
                                        padding: '5px',
                                        borderRadius: '4px',
                                        color: 'black'
                                    }}
                                >
                                    {task.status ? 'Complete' : 'Pending'}
                                </Typography>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskReport;
