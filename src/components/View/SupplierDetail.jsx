import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import  SU  from '../asset/SystemUnit.png'
import SupplierService from '../../Service/SupplierService';

const SupplierDetail = () => {
    const [asset, setAsset] = useState({})
    const [supplier, setSupplier] = useState({})
    const [loading, setLoading] = useState(true)
    // const navigate = useNavigate()
    const { id } = useParams()
  
    useEffect(() => {
      SupplierService.getSupplierAssetById(id)
        .then((response) => {
          setSupplier(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching supplier by ID:', error);
          setLoading(false);
        });
    }, [id]);
  
    // const deleteSupplierAsset = async (id) => {
    //   if (window.confirm('Are you sure you want to delete this?')) {
    //     try {
    //       const response = await SupplierService.deleteSupplierAsset(id);
    //       if (response.ok) {
    //         navigate('/supplier');
    //       } else {
    //         throw new Error('Failed to delete supplier');
    //       }
    //     } catch (error) {
    //       console.error('The ID given must not be null', error);
    //     }
    //   }
    // };
  
    // const formatDate = (dateString) => {
    //   if (!dateString) return 'N/A';
    //   const date = new Date(dateString);
    //   return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    // };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    const supplierdetails = [
      { label: 'Name', value: supplier.name },
      { label: 'E-mail', value: supplier.email },
      { label: 'Address', value: supplier.address },
      { label: 'Number', value: supplier.number },
    ]

    const assetDetails = [
        { label: 'id', value: asset.id },
        { label: 'Name', value: asset.assetName },
        { label: 'Model', value: asset.model },
        { label: 'Brand', value: asset.brand },
        { label: 'Price', value: asset.price },
        { label: 'Date', value: asset.date },
        { label: 'User', value: asset.user },
        { label: 'Status', value: asset.status },
    ]

  return (
    <body className='flex'>
        <section className='grid grid-cols-2 w-full gap-4'>
            <Card className='w-auto'>
                <div className='p-5 align-middle justify-center'>
                    <h2 className='text-lg font-semibold mb-4'>Supplier Details</h2>
                    {supplierdetails
                    .map(({ label, value }, index) => (
                        <p key={label} className={`py-2 pl-5 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        <span>{label} : </span>
                        {value || 'N/A'}
                        </p>
                    ))}
                </div>
            </Card>

            <Card className='w-auto'>
                <div className='p-5 align-middle justify-center'>
                    <h2 className='text-lg font-semibold mt-8 mb-4'>Asset Details</h2>
                    {assetDetails.map(({ label, value }, index) => (
                        <p key={label} className={`py-2 pl-5 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        <span>{label} : </span>
                        {value || 'N/A'}
                        </p>
                    ))}
                </div>
            </Card>
        </section>
    </body>
  )
}

export default SupplierDetail