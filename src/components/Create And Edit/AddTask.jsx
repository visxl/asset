import { Card, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useEffect } from 'react'
import TaskService from '../../Service/TaskService'

export const AddTask = () => {
  const [ problem, setProblem ] = useState()
  const [ solution, setSolution ] = useState()
  const [ reqBy, setReqBy ] = useState()
  const [ date, setDate ] = useState('')
  const [ fromTime, setFromTime ] = useState()
  const [ toTime, setToTime ] = useState()
  const [ status, setStatus ] = useState()
   
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

//   Handle save and update Button
const saveAndupdateTask = (e) => {
    e.preventDefault();
  
    const task = {
        problem, 
        solution, 
        reqBy,
        date, 
        fromTime, 
        toTime, 
        status
    };
  
    // Handle FindById Request
    if (id) {
      TaskService.updateTask(id, task)
        .then((response) => {
          console.log(response.data);
          navigate('/task');
        })
        .catch((error) => {
          console.log('Error updating asset by ID:', error);
        });
    } else {
      // Handle Create Asset Request
      TaskService.createTask(task)
        .then((response) => {
          console.log(response.data);
          navigate('/task');
        })
        .catch((error) => {
          console.log('Error creating asset', error);
          setError("Failed to create Asset")
        });
    }
  };

//   Handle Update Asset Request Put Method
  useEffect(() => {
    TaskService.getTaskById(id)
        .then((response) => {
            setProblem(response.data.problem);
            setSolution(response.data.solution);
            setReqBy(response.data.reqBy);
            setDate(response.data.date)
            setFromTime(response.data.fromTime);
            setToTime(response.data.toTime);
            setStatus(response.data.status);
        })
        .catch(error => {
            console.error('Error fetching asset by ID:', error);
        });
}, [id]);

    // Alert msg
    const title = () => {
        if(id) {
            return (
            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span class="font-medium">Update Form!</span>
            </div>) 
        }else {
            return (
            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span class="font-medium">Add New Task!</span>
            </div>) 
        }
    }

    return (
    <Card className='w-full h-full rounded-xl p-5 pb-32 shadow-lg'>
        {error && (
        <Typography className="text-red-500 mb-4">
          {error}
        </Typography>
      )}
        <Typography className="text-xl font-bold mb-6">
            Create New Task
        </Typography>
            {
                title()
            }
        <form className="max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-6 p-5">
            <div className="sm:col-span-2">
                <Typography className="text-lg mb-1">
                    Problem :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Error Printer'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="problem"
                value={problem} required
                onChange={(e) => setProblem(e.target.value)}
            />
            </div>
            <div className="sm:col-span-2">
                <Typography className="text-lg mb-2">
                    Solution :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Cancel print queue'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="solution"
                value={solution} required
                onChange={(e) => setSolution(e.target.value)}
            />
            </div>
            <div className="sm:col-span-2">
                <Typography className="text-lg mb-1">
                    Request By :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Mr. ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="reqBy"
                value={reqBy} required
                onChange={(e) => setReqBy(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Date :
                </Typography>
                <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="date"
                value={date} required
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    From Time :
                </Typography>
                <input
                type="time"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="fromTime"
                value={fromTime} required
                onChange={(e) => setFromTime(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    To Time :
                </Typography>
                <input
                type="time"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="toTime"
                value={toTime} required
                onChange={(e) => setToTime(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Status :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Yes No..'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="price"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1 py-3">
                <button onClick= {(e) => saveAndupdateTask(e)} className='w-28 mt-6 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                    Save
                </button>
                <Link to={`/task`} className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>Cancel</Link>
            </div>
        </form>
    </Card>
  )
}

export default AddTask