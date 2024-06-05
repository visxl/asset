import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Asset250Service from '../../Service/Asset250Service';
import { Card } from '@material-tailwind/react';
import  SU  from '../asset/SystemUnit.png'

const Asset250Detail = () => {
    const [asset250, setAsset250] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      Asset250Service.getAsset250ById(id)
        .then((response) => {
          setAsset250(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching asset by ID:', error);
          setLoading(false);
        });
    }, [id]);
  
    const deleteAsset250 = async (id) => {
      if (window.confirm('Are you sure you want to delete this?')) {
        try {
          const response = await Asset250Service.deleteAsset250(id);
          if (response.ok) {
            navigate('/asset250');
          } else {
            throw new Error('Failed to delete asset');
          }
        } catch (error) {
          console.error('The ID given must not be null', error);
        }
      }
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    const asset250Details = [
      { label: 'Id', value: asset250.id },
      { label: 'Type', value: asset250.type },
      { label: 'Name', value: asset250.name },
      { label: 'Asset Name', value: asset250.assetname },
      { label: 'Model', value: asset250.model },
      { label: 'Brand', value: asset250.brand },
      { label: 'Code', value: asset250.code },
      { label: 'Price', value: asset250.price },
      { label: 'Value', value: asset250.value },
      { label: 'Date', value: asset250.date },
      { label: 'Condition', value: asset250.condition },
      { label: 'User', value: asset250.user },
      { label: 'Office', value: asset250.office },
      { label: 'Department', value: asset250.department },
    ];
  
    const auditDetails = [
      { label: 'Last Modified By', value: asset250.lastModifiedBy },
      { label: 'Last Modified Date', value: formatDate(asset250.lastModifiedDate) },
    ];
  return (
    <body className='flex'>
    <section className='grid grid-cols-2 w-full gap-4'>
      <Card className='w-auto'>
        <div className='p-5 self-center'>
          <img src={SU} alt='assetImage' className='h-96' />
        </div>
        <div className='flex self-center mt-32'>
          <Link
            className='mt-4 text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center'
            to={`/edit-asset250/${id}`}
          >
            Edit
          </Link>
          <button
            className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
            onClick={() => deleteAsset250(id)}
          >
            Delete
          </button>
        </div>
      </Card>

      <Card className='w-auto'>
        <div className='p-5 align-middle justify-center'>
          <h2 className='text-lg font-semibold mb-4'>Asset Details</h2>
          {asset250Details.map(({ label, value }, index) => (
            <p key={label} className={`py-2 pl-5 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <span>{label} : </span>
              {value || 'N/A'}
            </p>
          ))}
          <h2 className='text-lg font-semibold mt-8 mb-4'>Audit Information</h2>
          {auditDetails.map(({ label, value }, index) => (
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

export default Asset250Detail