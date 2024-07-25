import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useEffect } from 'react'
import TaskService from '../../Service/TaskService'
import { HiArrowCircleLeft, HiSave } from 'react-icons/hi'
import { Button } from 'flowbite-react'

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
          console.log('Error updating task by ID:', error);
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
          setError("Failed to create Task")
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
            console.log(response)
        })
        .catch(error => {
            console.error('Error fetching task by ID:', error);
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

    if (error) {
        return (
            <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                Failed to create task
            </Typography>
        )
    }

    return (
        <div className='p-4 xxs:w-full md:w-full mt-5'>
        {error && (
        <Typography className="text-red-500 mb-4">
          {error}
        </Typography>
      )}
        <Typography className="text-xl font-bold mb-6 text-black dark:text-gray-200">
            Create New Task
        </Typography>
            {
                title()
            }
        <form className="xxs:w-full md:p-5 md:w-full h-full grid xxs:grid-cols-1 md:grid-cols-3 gap-3">
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    Problem :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Error Printer'
                className='bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500'
                name="problem"
                value={problem} required
                onChange={(e) => setProblem(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    Solution :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Cancel print queue'
                className='bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500'
                name="solution"
                value={solution} required
                onChange={(e) => setSolution(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    Request By :
                </Typography>
                <input
                type="text"
                placeholder='Ex: Mr. ...'
                className='bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500'
                name="reqBy"
                value={reqBy} required
                onChange={(e) => setReqBy(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    Date :
                </Typography>
                <input
                type="date"
                className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                name="date"
                value={date} required
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    From Time :
                </Typography>
                <input
                type="time"
                className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                name="fromTime"
                value={fromTime} required
                onChange={(e) => setFromTime(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    To Time :
                </Typography>
                <input
                type="time"
                className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                name="toTime"
                value={toTime} required
                onChange={(e) => setToTime(e.target.value)}
            />
            </div>
            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                    Status:
                </Typography>
                <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Status</option>
                    <option value='1' >Yes</option>
                    <option value='0'>No</option>
                </select>
            </div>  

            <div className="flex xxs:justify-between md:justify-start align-middle col-span-3 mt-5">
                <Button className='text-black dark:text-gray-200 text-sm xxs:w-32 md:w-20 mb-2' 
                    href='/add-task'
                    onClick={(e) => saveAndupdateTask(e)}
                >
                    <HiSave className="mr-2 h-5 w-5" />
                    Save
                </Button>
                <Button className='text-black dark:text-gray-200 text-sm xxs:w-32 md:w-20 mb-2' 
                    href='/task'
                >
                    <HiArrowCircleLeft className="mr-2 h-5 w-5" />
                    Cancel
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AddTask