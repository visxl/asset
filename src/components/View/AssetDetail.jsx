import { Card } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetService from '../../Service/AssetService';
import SU from '../asset/SystemUnit.png';

const AssetDetail = () => {
  const [asset, setAsset] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    AssetService.getAssetById(id)
      .then((response) => {
        setAsset(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching asset by ID:', error);
        setLoading(false);
      });
  }, [id]);

  const deleteAsset = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        const response = await AssetService.deleteAsset(id);
        if (response.ok) {
          navigate('/asset');
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

  const assetDetails = [
    { label: 'Id', value: asset.id },
    { label: 'Type', value: asset.type },
    { label: 'Name', value: asset.name },
    { label: 'Asset Name', value: asset.assetname },
    { label: 'Model', value: asset.model },
    { label: 'Brand', value: asset.brand },
    { label: 'Code', value: asset.code },
    { label: 'Price', value: asset.price },
    { label: 'Value', value: asset.value },
    { label: 'Date', value: asset.date },
    { label: 'Condition', value: asset.condition },
    { label: 'User', value: asset.user },
    { label: 'Other', value: asset.other },
    { label: 'Office', value: asset.office },
    { label: 'Department', value: asset.department },
    { label: 'PC', value: asset.pcname },
  ];

  const auditDetails = [
    { label: 'Last Modified By', value: asset.lastModifiedBy },
    { label: 'Last Modified Date', value: formatDate(asset.lastModifiedDate) },
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
              to={`/edit-asset/${id}`}
            >
              Edit
            </Link>
            <button
              className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
              onClick={() => deleteAsset(id)}
            >
              Delete
            </button>
          </div>
        </Card>

        <Card className='w-auto'>
          <div className='p-5 align-middle justify-center'>
            <h2 className='text-lg font-semibold mb-4'>Asset Details</h2>
            {assetDetails.map(({ label, value }, index) => (
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
  );
};

export default AssetDetail;
