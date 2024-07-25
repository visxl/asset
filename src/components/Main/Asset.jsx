/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import AssetService from '../../Service/AssetService';
import { ExportAsset } from '../Export Function/ExportAsset';
import { Button, Dropdown, Select } from 'flowbite-react';
import { HiChevronLeft, HiChevronRight, HiFilter, HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiSearch, HiX } from 'react-icons/hi';

const TABLE_HEAD = [
    "Id", 
    // "Name", 
    "Asset Name", 
    "Model", 
    "Brand", 
    "Code", 
    "Price($)",  
    // "Value($)",
    "Purchase Date", 
    "Condition", 
    "User", 
    "Other", 
    "Office", 
    "Status", 
    "Action"
];
const classes = "text-sm p-1 hover:bg-gray-300 dark:hover:bg-gray-500";

const Asset = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [assets, setAsset] = useState([]);
    // const navigate = useNavigate()

    const [selectStatus, setSelectStatus] = useState('');
    const [searchCode, setSearchCode] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [selectType, setSelectType] = useState('')
    const [selectOffice, setSelectOffice] = useState('');
    const [error, setError] = useState('');

    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        getAllAsset()
    }, [currentPage, selectStatus, searchCode, priceFilter, selectOffice, selectType]);

    const getAllAsset = async () => {
        try {
            let url = `http://localhost:8081/api/asset/page/${currentPage}`
            if (searchCode) {
                url = `http://localhost:8081/api/asset/code?code=${searchCode}`
            } else if (selectOffice) {
                url = `http://localhost:8081/api/asset/office?office=${selectOffice}`
            } else if (priceFilter) {
                url = `http://localhost:8081/api/asset/${priceFilter}`
            } else if (selectStatus) {
                url = `http://localhost:8081/api/asset/status?status=${selectStatus}`
            } else if (selectType) {
                url = `http://localhost:8081/api/asset/type?type=${selectType}`
            }
            // let url = `http://192.168.137.14:3308/api/asset/page/${currentPage}`
            // if (searchCode) {
            //     url = `http://192.168.137.14:3308/api/asset/code?code=${searchCode}`
            // } else if (selectOffice) {
            //     url = `http://192.168.137.14:3308/api/asset/office?office=${selectOffice}`
            // } else if (priceFilter) {
            //     url = `http://192.168.137.14:3308/api/asset/${priceFilter}`
            // } else if (selectStatus) {
            //     url = `http://192.168.137.14:3308/api/asset/status?status=${selectStatus}`
            // } else if (selectType) {
            //     url = `http://192.168.137.14:3308/api/asset/type?type=${selectType}`
            // }

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json()

            if (searchCode || priceFilter || selectOffice || selectStatus || selectType) {
                setAsset(data)
            } else {
                setTotalPages(data.totalPages)
                setTotalItems(data.totalItems)
                setAsset(data.asset)
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setError('Failed to fetch data')
            setLoading(false);
        }
    };

    const handleNextPage = () => setCurrentPage(prev => prev + 1)
    const handlePrevPage = () => setCurrentPage(prev => prev - 1)
    const handlePageChange = (page) => setCurrentPage(page)

    const renderPageNumbers = () => {
        const pageNumbers = []
        const visiblePages = 2
        
        for (let i = 1; i <= visiblePages; i++) {
            pageNumbers.push(i);
          }
          if (currentPage > visiblePages + 1) {
            pageNumbers.push('...');
          }
          for (let i = Math.max(visiblePages + 1, currentPage - 1); i <= Math.min(totalPages - visiblePages, currentPage + 1); i++) {
            pageNumbers.push(i);
          }
          if (currentPage < totalPages - visiblePages) {
            pageNumbers.push('...');
          }
          for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
            if (i > visiblePages) { 
              pageNumbers.push(i);
            }
          }
        
          return pageNumbers.map((number, index) => (
            <li key={index}>
              {number === '...' ? (
                <span className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</span>
              ) : (
                <Link
                  href="#"
                  onClick={() => handlePageChange(number)}
                  className={`flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                >
                  {number}
                </Link>
              )}
            </li>
          ));
        };
    
    const deleteAsset = async (assetId) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                const response = await AssetService.deleteAsset(assetId);
                if (response.ok) {
                    setShowDeleteToast(true);
                    setTimeout(() => setShowDeleteToast(false), 3000);
                    getAllAsset();
                } else {
                    throw new Error('Failed to delete asset');
                }
            } catch (error) {
                console.error('The ID given must not be null', error);
            }
        }
    };

    const handleSelectStatusChange = (event) => setSelectStatus(event.target.value);
    const handleSelectOfficeChange = (event) => setSelectOffice(event.target.value);
    const handleSearchCodeInputChange = (event) => setSearchCode(event.target.value);
    const handleSelectTypeChange = (event) => setSelectType(event.target.value);
    const handlePriceFilterChange = (event) => setPriceFilter(event.target.value);

    if (loading) {
        return (
            <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                Loading . . . 
            </Typography>
        )
    }

    if (error) {
        return (
            <Typography className='h-screen mt-10 text-2xl dark:text-gray-200'> 
                Error 404
            </Typography>
        )
    }

    return (
        <div>
            {showDeleteToast && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
                </div>
            )}
            <section className='mt-5 bg-white dark:bg-gray-700 relative shadow-2xl rounded-2xl overflow-hidden'>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-2">
                    <div className='w-auto xxs:max-w-full xs:max-w-96 sm:max-w-full xl:max-w-full'>
                        <div className="w-full">
                            <Typography className='text-left font-bold text-xl dark:text-gray-200'>
                                List Asset Over 250
                            </Typography>
                                    
                            {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                            {/* Search */}
                            <div className='mt-10 flex flex-col'>
                                <div className='flex md:flex-row xxs:flex-col items-start'>
                                    <div className=' items-center xxs:w-full md:max-w-sm'>
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative w-full mb-2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
                                                <HiSearch className='text-black dark:text-gray-200'/>
                                            </div>
                                            <input type="text" id="simple-search" value={searchCode} onChange={handleSearchCodeInputChange} 
                                                className="dark:text-gray-200 bg-gray-50 border dark:bg-gray-600 border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm rounded-lg block w-80 xxs:w-full ps-10 h-9 " placeholder="Search Asset Code..." />
                                        </div>
                                    </div>                                          
                                </div>
                            </div>
                            {/* Search end */}

                            {/* Function Button */}
                            <div className='xxs:w-full flex md:flex-row xxs:flex-col md:justify-start xxs:justify-evenly '>
                                <div className="flex xxs:flex-col md:flex-row">
                                    <div className="flex xxs:flex-row md:mr-2">
                                        <Button className='text-black dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm xxs:w-full md:w-36 mb-2 mr-2 hover:bg-gray-200 dark:hover:bg-gray-900' href='/add-asset'>
                                            <HiPlus className="mr-2 h-5 w-5" />
                                                Create
                                        </Button>
                                        <Button className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2 dark:focus:ring-gray-500 dark:focus:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900' href='/asset/report'>
                                            <HiOutlineEye className="mr-2 h-5 w-5" />
                                                Preview
                                        </Button>
                                    </div>
                                    <div className="flex xxs:flex-row">
                                        <ExportAsset excelData={assets} fileName={'List 31 06 2024 Over 250'} />
                                        <Dropdown label="Filter" dismissOnClick={false} renderTrigger={() => 
                                            <Button className='text-black dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm xxs:w-full md:w-36 mb-2 hover:bg-gray-200 dark:hover:bg-gray-900'>
                                                <HiFilter className='mr-2 w-5 h-5'/> Filter
                                            </Button>}>
                                            <Select className='text-black text-sm xxs:w-full md:w-36 mb-2'
                                                value={priceFilter} onChange={handlePriceFilterChange}
                                            >
                                                <option className='w-80' value="" >Price</option>
                                                <option className='w-80' value="asc">Ascending</option>
                                                <option className='w-80' value="desc">Descending</option>
                                            </Select>
                                            <Select className='text-black text-sm xxs:w-full md:w-36 mb-2 gap-2'
                                                value={selectOffice}
                                                onChange={handleSelectOfficeChange}
                                            >
                                                <option value=''>Office</option>
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
                                            </Select>                                                        
                                            <Select className='text-black  text-sm xxs:w-full md:w-36 mb-2'
                                                value={selectStatus}
                                                onChange={handleSelectStatusChange}
                                            >
                                                <option value=''>Status</option>
                                                <option value='1'>Active</option>
                                                <option value='0'>Inactive</option>
                                            </Select>
                                            <Select className='text-black text-sm xxs:w-full md:w-36 mb-2'
                                                value={selectType}
                                                onChange={handleSelectTypeChange}
                                            >
                                                <option value=''>Type</option>
                                                <option value='OE'>OE</option>
                                                <option value='OT'>OT</option>
                                                <option value='TR'>TR</option>
                                            </Select>
                                         </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Function Button */}

                        <div className="overflow-x-auto ">
                            <table className="overflow-x-auto text-black bg-white dark:bg-gray-700 dark:text-gray-200">
                                <thead>
                                    <tr > 
                                        {TABLE_HEAD.map((head, index) => (
                                            <th key={index} className="border-none bg-gray-100 dark:bg-gray-800">                                                            
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-sans"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                            
                                </thead>
                                <tbody>
                                    {assets && assets
                                        .map(assets => {
                                            return ( 
                                                <tr key={assets.id} className={classes}>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="text-xs font-normal">
                                                            {assets.id}
                                                        </Typography>
                                                    </td>
                                                    {/* <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.name}
                                                        </Typography>
                                                    </td> */}
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.assetName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.model}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.brand}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.code}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.price}
                                                        </Typography>
                                                    </td>
                                                    {/* <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.value}
                                                        </Typography>
                                                    </td> */}
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.date}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.condition}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.user}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.other}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                            {assets.office}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal text-xs "
                                                            style={{
                                                                padding: '5px',
                                                                borderRadius: '4px',
                                                                color: assets.status ? 'black dark:text-gray-200' : 'red', 
                                                            }}
                                                        >
                                                            {assets.status ? 'Active' : 'Inactive'}
                                                        </Typography>
                                                    </td>
                                                    <td className="text-sm w-28">
                                                        <Dropdown label='Action' color='black' backgroundColor='gray' size="sm" className='w-28'>
                                                            <Dropdown.Item href={`/asset/view/${assets.id}`} className='w-28'><HiOutlineEye className="mr-2 h-4 w-4" />View</Dropdown.Item>
                                                            <Dropdown.Item href={`/edit-asset/${assets.id}`} className='w-28'><HiOutlinePencilAlt className="mr-2 h-4 w-4" />Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteAsset(assets.id)} className='w-28'><HiOutlineTrash className="mr-2 h-4 w-4" />Delete</Dropdown.Item>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )} 
                                </tbody>
                            </table>
                        </div>
                        <Typography className='mt-5 mb-5 text-black dark:text-gray-200'>
                            Total Asset: {totalItems}
                        </Typography>
                        <nav className="flex flex-col items-center justify-between space-y-3 md:flex-row md:items-start md:space-y-0" aria-label="Table navigation">
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <Link
                                        href="#"
                                        onClick={handlePrevPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <HiChevronLeft className='w-5 h-5'/>
                                    </Link>
                                </li>
                                    {renderPageNumbers()}
                                <li>
                                    <Link
                                        href="#"
                                        onClick={handleNextPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <HiChevronRight className='w-5 h-5'/>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Asset;
