import { Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Asset250Service from '../../Service/Asset250Service';


export const AddAsset250 = () => {

  const [name, setName] = useState();
  const [assetName, setAssetName] = useState();
  const [model, setModel] = useState();
  const [brand, setBrand] = useState();
  const [code, setCode] = useState();
  const [price, setPrice] = useState();
  const [value, setValue] = useState();
  const [date, setDate] = useState();
  const [condition, setCondition] = useState();
  const [user, setUser] = useState();
  const [office, setOffice] = useState();
  const [department, setDepartment] = useState();
  const [other, setOther] = useState();
  const [pcName, setPcName] = useState();
  const [type, setType] = useState();
  const [status, setStatus] = useState();

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


//   Handle save and update Button
const saveAndupdateAsset250 = (e) => {
    e.preventDefault();
  
    const asset250 = { name, assetName, model, brand, code, price, value, date, condition, user, office, department, type , other, pcName, status};
  
    // Handle FindById Request
    if (id) {
      Asset250Service.updateAsset250(id, asset250)
        .then((response) => {
          console.log(response.data);
          navigate('/asset250');
        })
        .catch((error) => {
          console.log('Error updating asset by ID:', error);
          setError("Failed to update asset")
        });
    } else {
      // Handle Create Asset Request
      Asset250Service.createAsset250(asset250)
        .then((response) => {
          console.log(response.data);
          navigate('/asset250');
        })
        .catch((error) => {
          console.log('Error creating asset', error);
          setError("Failed to create asset")
        });
    }
  };

  useEffect(() => {
    Asset250Service.getAsset250DetailById(id)
        .then((response) => {
            setName(response.data.name);
            setAssetName(response.data.assetName);
            setModel(response.data.model);
            setBrand(response.data.brand);
            setCode(response.data.code);
            setPrice(response.data.price);
            setValue(response.data.value);
            setDate(response.data.date);
            setCondition(response.data.condition);
            setUser(response.data.user);
            setOther(response.data.other);
            setOffice(response.data.office);
            setDepartment(response.data.department);
            setType(response.data.type);
            setPcName(response.data.pcName);
            setStatus(response.data.status)
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
        <div className='p-4 xxs:w-full md:w-full mt-5'>
        {error && (
        <Typography className="text-red-500 mb-4">
          {error}
        </Typography>
      )}
        <Typography className="text-xl font-bold mb-6">
            Asset under 250
        </Typography>
            {
                title()
            }
        <form className="xxs:w-80 md:p-5 md:w-screen h-full grid xxs:grid-cols-1 md:grid-cols-3 gap-3">
            <div className="xxs:col-span-3 md:col-span-1">
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

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Asset Name:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
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

            <div className="xxs:col-span-3 md:col-span-1">
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
            <div className="xxs:col-span-3 md:col-span-1">
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
            <div className="xxs:col-span-3 md:col-span-1">
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
            <div className="xxs:col-span-3 md:col-span-1">
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
            <div className="xxs:col-span-3 md:col-span-1">
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
            <div className="xxs:col-span-3 md:col-span-1">
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

            <div className="xxs:col-span-3 md:col-span-1">
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

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    PC Name:
                </Typography>
                <input
                type="text"
                placeholder='Ex: PC21'
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="pcname"
                value={pcName}
                onChange={(e) => setPcName(e.target.value)}
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

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Condition:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Condition</option>
                    <option value='New'>New</option>
                    <option value='Mid'>Mid</option>
                    <option value='Old'>Old</option>
                </select>
            </div>

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Type:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Type</option>
                    <option value='OE'>OE</option>
                    <option value='OT'>OT</option>
                    <option value='TR'>TR</option>
                </select>
            </div>

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Office:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Department:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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

            <div className="xxs:col-span-3 md:col-span-1">
                <Typography className="text-lg mb-1">
                    Status:
                </Typography>
                <select className='w-full text-black bg-gray-50 border border-gray-400 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='' className='text-gray-400' selected>Select Asset Status</option>
                    <option value='true' >Active</option>
                    <option value='false'>Inactive</option>
                </select>
            </div>
            
            <div className="flex xxs:justify-between md:justify-start align-middle col-span-3">
                <button onClick= {(e) => saveAndupdateAsset250(e)} className='w-28 mt-7 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                    Save
                </button>
                <Link to={`/asset250`} className='w-28 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-center self-center text-sm px-5 py-2.5'>Cancel</Link>
            </div>
        </form>
    </div>
  )
}

export default AddAsset250