import { Card, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CustomerService from '../../Service/CustomerService'

export const AddCustomer = () => {

    const [ fullName, setFullname ] = useState()
    const [ email, setEmail ] = useState()
    const [ address, setAddress ] = useState()
    const [ phoneNumber, setPhoneNumber ] = useState()
    const [ policyNumber, setPolicyNumber ] = useState()
    const [ type, setType ] = useState()
    
    const navigate = useNavigate();
    const {id} = useParams();
  
  //   Handle save and update Button
  const saveAndupdateCustomer = (e) => {
      e.preventDefault();
    
      const customer = { fullName, email, address, phoneNumber, policyNumber, type };
    
      // Handle FindById Request
      if (id) {
        CustomerService.updateCustomer(id, customer)
          .then((response) => {
            console.log(response.data);
            navigate('/customer');
          })
          .catch((error) => {
            console.log('Error updating asset by ID:', error);
          });
      } else {
        // Handle Create Asset Request
        CustomerService.createCustomer(customer)
          .then((response) => {
            console.log(response.data);
            navigate('/customer');
          })
          .catch((error) => {
            console.log('Error creating customer', error);
          });
      }
    };
  
  //   Handle Update Asset Request Put Method
    useEffect(() => {
      CustomerService.getCustomerById(id)
      
          .then((response) => {
            setFullname(response.data.fullName);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phoneNumber);
            setPolicyNumber(response.data.policyNumber);
            setType(response.data.type);

            console.log(response.data)
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
                  <span class="font-medium">Add New Asset!</span>
              </div>) 
          }
      }

    return (
    <Card className='w-full h-screen rounded-xl p-5 pb-32 shadow-lg'>
        <Typography className="text-xl font-bold mb-6">
            New Customer
        </Typography>
            {
                title()
            }
        <form className="max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-6 p-5">
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Fullname:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Email:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Address:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Phone Number:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Policy Number:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="policyNumber"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Type:
                </Typography>
                <input
                type="type"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            </div>

            <div className="sm:col-span-1 py-3">
                <button onClick= {(e) => saveAndupdateCustomer(e)} className='w-28 mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                    Save
                </button>
                <Link to={`/customer`} className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>Cancel</Link>
            </div>
        </form>
    </Card>
  )
}

export default AddCustomer