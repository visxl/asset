import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AssetService from '../../Service/AssetService'
import { useEffect } from 'react'
import SupplierService from '../../Service/SupplierService'
import { HiArrowCircleLeft, HiChevronRight, HiHome, HiSave } from 'react-icons/hi'
import { Button } from 'flowbite-react'

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
                                Supplier
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <HiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-400'/>
                            <Link to="/add-supplier" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Create
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav>
            {/* <!-- End Breadcrumb --> */}
        <div className='p-4 xxs:w-full md:w-full mt-5'>
            {error && (
                <Typography className="text-red-500 mb-4">
                {error}
                </Typography>
            )}
            <Typography className="text-xl font-bold mb-6 dark:text-gray-200">
                Supplier
            </Typography>
                {
                    title()
                }
            <form className="xxs:w-full md:p-5 md:w-screen h-full grid xxs:grid-cols-1 md:grid-cols-3 gap-3">
                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="text-lg mb-1 text-black dark:text-gray-200">
                        Name:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ម៉ូនីទ័រ...'
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="name"
                        value={name} required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="text-lg mb-1 text-black dark:text-gray-200">
                        Email:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: E1910c...'
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="brand"
                        value={email} required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="text-lg mb-1 text-black dark:text-gray-200">
                        Address:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: HP, Dell...'
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="model"
                        value={address} required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="text-lg mb-1 text-black dark:text-gray-200">
                        Number:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: E1910c...'
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="brand"
                        value={number} required
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <div className="flex xxs:justify-between md:justify-start align-middle col-span-3 mt-5">
                    <Button className='text-black dark:text-gray-200 text-sm w-32 mb-2 mr-2' href='/add-asset'
                        onClick={(e) => SaveAndUpdateSupplier(e)}
                    >
                        <HiSave className="mr-2 h-5 w-5" />
                        Save
                    </Button>
                    <Button className='text-black dark:text-gray-200 text-sm w-32 mb-2' href='/asset'>
                        <HiArrowCircleLeft className="mr-2 h-5 w-5" />
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    </>
  )
}

export default AddSupplier