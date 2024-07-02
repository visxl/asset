import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssetService from '../../Service/AssetService';
import SU from '../asset/SystemUnit.png';
import SupplierService from '../../Service/SupplierService';

const AssetDetail = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSupplier();
        if (data) {
          setSuppliers(data);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [id]);

  const getAllSupplier = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/supplier');
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return null;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex'>
      <section className='grid grid-cols-2 w-full gap-4'>
        <Card className='w-auto'>
          <div className='p-5 align-middle justify-center'>
            <h2 className='text-lg font-semibold mb-4'>Asset Details</h2>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) =>
                supplier.assets.map((asset) => (
                  <div key={asset.id} className='mb-4'>
                    <Typography variant="h6" className="font-bold">
                      Asset ID: {asset.id}
                    </Typography>
                    <Typography variant="body1">
                      Asset Name: {asset.assetName}
                    </Typography>
                    <Typography variant="body1">
                      Model: {asset.model}
                    </Typography>
                    <Typography variant="body1">
                      Brand: {asset.brand}
                    </Typography>
                    <Typography variant="body1">
                      Price: {asset.price}
                    </Typography>
                    <Typography variant="body1">
                      Date: {asset.date || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      User: {asset.user}
                    </Typography>
                    <Typography variant="body1">
                      Supplier Name: {supplier.name}
                    </Typography>
                    <Typography variant="body1">
                      Supplier Email: {supplier.email}
                    </Typography>
                    <Typography variant="body1">
                      Supplier Phone Number: {supplier.number}
                    </Typography>
                    <Typography variant="body1">
                      Supplier Address: {supplier.address}
                    </Typography>
                    <hr className="my-4" />
                  </div>
                ))
              )
            ) : (
              <Typography variant="body1">No assets found.</Typography>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AssetDetail;
