import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Asset250Service from '../../Service/Asset250Service';

const AddAsset250 = () => {
    const [ name, setName ] = useState()
    const [ assetname, setAssetname ] = useState()
    const [ model, setModel ] = useState()
    const [ brand, setBrand ] = useState()
    const [ code, setCode ] = useState()
    const [ price, setPrice ] = useState()
    const [ value, setValue ] = useState()
    const [ date, setDate ] = useState()
    const [ condition, setCondition ] = useState()
    const [ user, setUser ] = useState()
    const [ office, setOffice ] = useState()

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            Asset250Service.getAsset250ById(id)
                .then((response) => {
                    setName(response.data.name);
                    setAssetname(response.data.assetname);
                    setModel(response.data.model);
                    setBrand(response.data.brand);
                    setCode(response.data.code);
                    setPrice(response.data.price);
                    setValue(response.data.value);
                    setDate(response.data.date);
                    setCondition(response.data.condition);
                    setUser(response.data.user);
                    setOffice(response.data.office);
                })
                .catch(error => {
                    console.error('Error fetching asset by ID:', error);
                });
        }
    }, [id]);

    const saveAndupdateAsset250 = (e) => {
        e.preventDefault();
        const asset250 = { name, assetname, model, brand, code, price, value, date, condition, user, office };

        if (id) {
            Asset250Service.updateAsset250(id, asset250)
                .then((response) => {
                    console.log(response.data);
                    navigate('/asset250');
                })
                .catch((error) => {
                    console.log('Error updating asset by ID:', error);
                });
        } else {
            Asset250Service.createAsset250(asset250)
                .then((response) => {
                    console.log(response.data);
                    navigate('/asset250');
                })
                .catch((error) => {
                    console.log('Error creating asset', error);
                });
        }
    };

    return (
        <Card className='w-full h-screen rounded-xl p-5 pb-32 shadow-lg'>
            <Typography className="text-xl font-bold mb-6">
                {id ? 'Update Asset 250' : 'Create New Asset 250'}
            </Typography>
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span className="font-medium">{id ? 'Update Form!' : 'Add New Asset Under 250!'}</span>
            </div>
            <form className="max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-6 p-5">
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Name:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Assetname:
                </Typography>
                <input
                type="text"
                placeholder='Ex: Monitor...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="Assetname"
                value={assetname}
                onChange={(e) => setAssetname(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Model:
                </Typography>
                <input
                type="text"
                placeholder='Ex: HP, Dell...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Brand:
                </Typography>
                <input
                type="text"
                placeholder='Ex: E1910c...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Code:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ADM FA 00000...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Price:
                </Typography>
                <input
                type="number"
                placeholder='Ex: 000.00...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Value:
                </Typography>
                <input
                type="number"
                placeholder='Ex: 000.00...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Purchase Date:
                </Typography>
                <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Condition:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ថ្មី, ចាស់, ខូច...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    User:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ប្រើរួម...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Office/Department:
                </Typography>
                <input
                type="text"
                placeholder='Ex: រដ្ឋបាល...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="office"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
            />
            </div>
            <div className="sm:col-span-1 py-3">
                <button onClick= {(e) => saveAndupdateAsset250(e)} className='w-28 mt-6 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                    Save
                </button>
                <Link to={`/asset250`} className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>Cancel</Link>
            </div>
            </form>
        </Card>
    );
};

export default AddAsset250;
