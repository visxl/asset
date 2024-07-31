import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AssetService from '../../Service/AssetService'
import { useEffect } from 'react'
import { HiArrowCircleLeft, HiCheck, HiChevronRight, HiHome, HiSave } from 'react-icons/hi'
import { Button } from 'flowbite-react'

export const AddAsset = () => {
  
  const [ name, setName ] = useState()
  const [ assetName, setAssetName ] = useState()
  const [ model, setModel ] = useState()
  const [ brand, setBrand ] = useState()
  const [ code, setCode ] = useState()
  const [ price, setPrice ] = useState()
  const [ value, setValue ] = useState()
  const [ date, setDate ] = useState()
  const [ condition, setCondition ] = useState()
  const [ user, setUser ] = useState()
  const [ office, setOffice ] = useState()
  const [ department, setDepartment ] = useState()
  const [ other, setOther ] = useState()
  const [ pcName, setPcName ] = useState()
  const [ type, setType ] = useState()
  const [ status, setStatus] = useState()
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

//   Handle save and update Button
const saveAndupdateAsset = (e) => {
    e.preventDefault();
  
    const asset = { name, assetName, model, brand, code, price, value, date, condition, user, office, department, type , other, pcName, status};

    // Handle FindById Request
    if (id) {
      AssetService.updateAsset(id, asset)
        .then((response) => {
          console.log(response.data);
          navigate('/asset');
        })
        .catch((error) => {
          console.log('Error updating asset by ID:', error);
          setError("Failed to update asset")
        });
    } else {
      // Handle Create Asset Request
      AssetService.createAsset(asset)
        .then((response) => {
          setShowSuccessToast(true)
          setTimeout(() => setShowSuccessToast(false), 3000)
          console.log(response.data);
          navigate('/asset');
        })
        .catch((error) => {
          console.log('Error creating asset', error);
          setError("Failed to create asset")
        });
    }
  };

    useEffect(() => {
        AssetService.getAssetDetailById(id)
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
            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 w-full" role="alert">
                <span class="font-medium">Update Form!</span>
            </div>) 
        }else {
            return (
            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 w-full" role="alert">
                <span class="font-medium">Add New Asset!</span>
            </div>) 
        }
    }

return (
    <>
        {/* <!-- Breadcrumb --> */}
        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
                            <Link to="/asset" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Asset
                            </Link>
                        </div>
                    </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <HiChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-400'/>
                        <Link to="/add-asset" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                            Create
                        </Link>
                    </div>
                </li>
            </ol>
        </nav>
        {/* <!-- End Breadcrumb --> */}
        {showSuccessToast && (
            <div className="fixed top-4 right-4 z-50">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Item created successfully.</div>
            </div>
        )}
        <div className='p-4 xxs:w-full md:w-full mt-5'>
            {error && (
            <Typography className="text-red-500 mb-4">
            {error}
            </Typography>
        )}
            <Typography className="text-xl font-bold mb-6 text-black dark:text-gray-200">
                Asset Over 250
            </Typography>
                {
                    title()
                }
            <form className="xxs:w-full md:w-full h-full grid xxs:grid-cols-1 md:grid-cols-3 gap-3">
                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Name:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ម៉ូនីទ័រ...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="name"
                        value={name} required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Asset Name:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                    >
                        <option value='' className='text-black dark:text-gray-200' selected>Select Assetname</option>
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
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Model:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: HP, Dell...'
                        className="bg-gray-50 dark:bg-gray-500 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="model"
                        value={model} required
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Brand:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: E1910c...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="brand"
                        value={brand} required
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Code:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ADM FA 00000...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="code"
                        value={code} 
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Price:
                    </Typography>
                    <input
                        type="number"
                        placeholder='Ex: 000.00...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Value:
                    </Typography>
                    <input
                        type="number"
                        placeholder='Ex: 000.00...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black  dark:text-gray-200">
                        Purchase Date:
                    </Typography>
                    <input
                        type="date"
                        className="bg-gray-50 border dark:text-gray-200 border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="date"
                        value={date} required
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        User:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ប្រើរួម...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="user"
                        value={user} 
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        PC Name:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: PC21'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="pcname"
                        value={pcName}
                        onChange={(e) => setPcName(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Other:
                    </Typography>
                    <input
                        type="text"
                        placeholder='Ex: ប្រើរួម...'
                        className="bg-gray-50 border border-gray-300 md:text-sm xxs:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        name="other"
                        value={other}
                        onChange={(e) => setOther(e.target.value)}
                    />
                </div>

                <div className="xxs:col-span-3 md:col-span-1">
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Condition:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Type:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Office:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Department:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
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
                    <Typography className="md:text-lg xxs:text-xs mb-1 text-black dark:text-gray-200">
                        Status:
                    </Typography>
                    <select className='w-full text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-500 border border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 font-medium rounded-lg md:text-md xxs:text-xs xxs:h-10'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value='' className='text-gray-400' selected>Select Asset Status</option>
                        <option value='true' >Active</option>
                        <option value='false'>Inactive</option>
                    </select>
                </div>              

                <div className="flex xxs:justify-between md:justify-start align-middle col-span-3 mt-5">
                    <Button className='text-black dark:text-gray-200 text-sm w-32 mb-2 mr-2' href='/add-asset'
                        onClick={(e) => saveAndupdateAsset(e)}
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

export default AddAsset