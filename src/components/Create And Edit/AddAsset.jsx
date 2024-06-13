import { Card, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AssetService from '../../Service/AssetService'
import { useEffect } from 'react'

export const AddAsset = () => {
  
  const [ name, setName ] = useState()
  const [ assetname, setAssetname ] = useState()
  const [ model, setModel ] = useState()
  const [ brand, setBrand ] = useState()
  const [ code, setCode ] = useState()
  const [ price, setPrice ] = useState()
  const [ value, setValue ] = useState()
  const [ date, setDate ] = useState()
  const [ assetcondition, setAssetCondition ] = useState()
  const [ user, setUser ] = useState()
  const [ office, setOffice ] = useState()
  const [ department, setDepartment ] = useState()
  const [ other, setOther ] = useState()
  const [ pcname, setPcname ] = useState()
  const [ type, setType ] = useState()
  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

//   Handle save and update Button
const saveAndupdateAsset = (e) => {
    e.preventDefault();
  
    const asset = { name, assetname, model, brand, code, price, value, date, assetcondition, user, office, department, type , other, pcname};
  
    // Handle FindById Request
    if (id) {
      AssetService.updateAsset(id, asset)
        .then((response) => {
          console.log(response.data);
          navigate('/asset');
        })
        .catch((error) => {
          console.log('Error updating asset by ID:', error);
        });
    } else {
      // Handle Create Asset Request
      AssetService.createAsset(asset)
        .then((response) => {
          console.log(response.data);
          navigate('/asset');
        })
        .catch((error) => {
          console.log('Error creating asset', error);
          setError("Failed to create Asset")
        });
    }
  };

//   Handle Update Asset Request Put Method
  useEffect(() => {
    AssetService.getAssetById(id)
        .then((response) => {
            setName(response.data.name);
            setAssetname(response.data.assetname);
            setModel(response.data.model);
            setBrand(response.data.brand);
            setCode(response.data.code);
            setPrice(response.data.price);
            setValue(response.data.value);
            setDate(response.data.date);
            setAssetCondition(response.data.assetcondition);
            setUser(response.data.user);
            setOther(response.data.other);
            setOffice(response.data.office);
            setDepartment(response.data.department);
            setType(response.data.type);
            setPcname(response.data.pcname);
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
    <Card className='w-full h-full rounded-xl p-5 pb-32 shadow-lg'>
        {error && (
        <Typography className="text-red-500 mb-4">
          {error}
        </Typography>
      )}
        <Typography className="text-xl font-bold mb-6">
            Create New Asset
        </Typography>
            {
                title()
            }
        <form className="max-w-screen-lg grid sm:grid-cols-2 gap-6 p-5">
            <div className="sm:col-span-1">
                <Typography className="text-lg mb-1">
                    Name:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ម៉ូនីទ័រ...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="name"
                value={name} required
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            <div className="col-span-1">
                <Typography className="text-lg mb-1">
                    Asset Name:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg text-md'
                    value={assetname}
                    onChange={(e) => setAssetname(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Assetname</option>
                    <option value='Monitor'>Monitor</option>
                    <option value='System Unit'>System Unit</option>
                    <option value='Printer'>Printer</option>
                    <option value='Laptop'>Laptop</option>
                    <option value='UPS'>UPS</option>
                    <option value='Switch'>Switch</option>
                    <option value='Server'>Server</option>
                    <option value='AllInOne'>All in one</option>
                </select>
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
                value={model} required
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
                value={brand} required
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
                value={date} required
                onChange={(e) => setDate(e.target.value)}
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
                    PC Name:
                </Typography>
                <input
                type="text"
                placeholder='Ex: PC21'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="pcname"
                value={pcname}
                onChange={(e) => setPcname(e.target.value)}
            />
            </div>

            <div className="col-span-2">
                <Typography className="text-lg mb-1">
                    Other:
                </Typography>
                <input
                type="text"
                placeholder='Ex: ប្រើរួម...'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="other"
                value={other}
                onChange={(e) => setOther(e.target.value)}
            />
            </div>

            <div className="col-span-1">
                <Typography className="text-lg mb-1">
                    Condition:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg text-md'
                    value={assetcondition}
                    onChange={(e) => setAssetCondition(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Condition</option>
                    <option value='New'>New</option>
                    <option value='Mid'>Mid</option>
                    <option value='Old'>Old</option>
                    <option value=''>...</option>
                </select>
            </div>

            <div className="col-span-1">
                <Typography className="text-lg mb-1">
                    Type:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg text-md'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Type</option>
                    <option value='OE'>OE</option>
                    <option value='OT'>OT</option>
                    <option value='TR'>TR</option>
                    <option value=''>...</option>
                </select>
            </div>

            

            <div className="col-span-1">
                <Typography className="text-lg mb-1">
                    Office:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg text-md'
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected disabled>Select Office</option>
                    <option value='Administrator'>Administrator</option>
                    <option value='Cashier'>Cashier</option>
                    <option value='CustomerService'>CustomerService</option>
                    <option value='Claim'>Claim</option>
                    <option value='AccountingAndFinance'>AccountingAndFinance</option>
                    <option value='InternalAudit'>InternalAudit</option>
                    <option value='Technical'>Technical</option>
                    <option value='MarketingAndSale'>MarketingAndSale</option>
                    <option value='InformationTechnology'>InformationTechnology</option>
                    <option value='KampongCham'>KampongCham</option>
                    <option value='Takeo'>Takeo</option>
                    <option value='BanteayMeanchey'>BanteayMeanchey</option>
                    <option value='Battambang'>Battambang</option>
                    <option value='Preyveng'>Preyveng</option>
                    <option value='ShianoukVille'>ShianoukVille</option>
                    <option value='Siemreap'>Siemreap</option>
                </select>
            </div>

            <div className="col-span-1">
                <Typography className="text-lg mb-1">
                    Department:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg text-md'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected disabled>Select Department</option>
                    <option value='Administrator'>Administrator</option>
                    <option value='Cashier'>Cashier</option>
                    <option value='CustomerService'>CustomerService</option>
                    <option value='Claim'>Claim</option>
                    <option value='AccountingAndFinance'>AccountingAndFinance</option>
                    <option value='InternalAudit'>InternalAudit</option>
                    <option value='Technical'>Technical</option>
                    <option value='MarketingAndSale'>MarketingAndSale</option>
                    <option value='InformationTechnology'>InformationTechnology</option>
                </select>
            </div>
            
            <div className="sm:col-span-1 py-3">
                <button onClick= {(e) => saveAndupdateAsset(e)} className='w-28 mt-6 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                    Save
                </button>
                <Link to={`/asset`} className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>Cancel</Link>
            </div>
        </form>
    </Card>
  )
}

export default AddAsset