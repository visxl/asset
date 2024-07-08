import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AssetService from '../../Service/AssetService'
import { useEffect } from 'react'
import SupplierService from '../../Service/SupplierService'

export const AddSupplier = () => {
  
  const [ name, setName ] = useState()
  const [ email, setEmail ] = useState()
  const [ address, setAddress ] = useState()
  const [ number, setNumber ] = useState()
  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

//   Handle save and update Button
const SaveAndUpdateSupplier = (e) => {
    e.preventDefault();
  
    const supplier = { name, email, address, number };
  
    // Handle FindById Request
    if (id) {
      SupplierService.updateSupplierAsset(id, supplier)
        .then((response) => {
          console.log(response.data);
          navigate('/supplier');
        })
        .catch((error) => {
          console.log('Error updating asset by ID:', error);
          setError("Failed to update asset")
        });
    } else {
      // Handle Create Asset Request
      SupplierService.createSupplierAsset(supplier)
        .then((response) => {
          console.log(response.data);
          navigate('/supplier');
        })
        .catch((error) => {
          console.log('Error creating supplier', error);
          setError("Failed to create supplier")
        });
    }
  };

  useEffect(() => {
    AssetService.getAssetDetailById(id)
        .then((response) => {
            setName(response.data.name);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setNumber(response.data.number);
        })
        .catch(error => {
            console.error('Error fetching supplier by ID:', error);
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
    <>
        <div className='p-4 xxs:w-full md:w-full mt-5'>
            {error && (
                <Typography className="text-red-500 mb-4">
                {error}
                </Typography>
            )}
            <Typography className="text-xl font-bold mb-6">
                Supplier
            </Typography>
                {
                    title()
                }
            <form className="xxs:w-80 md:p-5 md:w-screen h-full grid xxs:grid-cols-1 md:grid-cols-3 gap-3">
                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1">
                        Name:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ម៉ូនីទ័រ...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={name} required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1">
                        Email:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: E1910c...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="brand"
                        value={email} required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1">
                        Address:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: HP, Dell...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="model"
                        value={address} required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1">
                        Number:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: E1910c...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="brand"
                        value={number} required
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <div className="flex xxs:justify-between md:justify-start align-middle col-span-3">
                    <button onClick= {(e) => SaveAndUpdateSupplier(e)} className='w-28 mt-7 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg text-center self-center text-sm px-5 py-2.5 me-2 mb-2 '>
                        Save
                    </button>
                    <Link to={`/supplier`} className='w-28 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm text-center self-center px-5 py-2.5'>Cancel</Link>
                </div>
            </form>
        </div>
    </>
  )
}

export default AddSupplier