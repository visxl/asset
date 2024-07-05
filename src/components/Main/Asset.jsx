/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import AssetService from '../../Service/AssetService';
import { ExportAsset } from '../Export Function/ExportAsset';
// import { HiPlus } from 'react-icons/hi';


// Table thead
const TABLE_HEAD = ["Id", 
    "Name", 
    "Asset Name", 
    "Model", 
    "Brand", 
    "Code", 
    "Price($)",  
    "Value($)",
    "Purchase Date", 
    "Condition", 
    "User", 
    // "Other", 
    "Office", 
    "Status", 
    "Action"];
const classes = "border border-solid text-sm p-1 hover:bg-gray-300";

const Asset = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [assets, setAsset] = useState([]);

    const [selectStatus, setSelectStatus] = useState('');
    const [searchCode, setSearchCode] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [selectOffice, setSelectOffice] = useState('');
    const [error, setError] = useState('');
    

    useEffect(() => {
        getAllAsset();
    }, [currentPage, selectStatus, searchCode, priceFilter, selectOffice]);

    const getAllAsset = async () => {
        try {
            let url = `http://192.168.137.14:3308/api/asset/page/${currentPage}`;
            if (searchCode) {
                url = `http://192.168.137.14:3308/api/asset/code?code=${searchCode}`;
            } else if (selectOffice) {
                url = `http://192.168.137.14:3308/api/asset/office?office=${selectOffice}`;
            } else if (priceFilter) {
                url = `http://192.168.137.14:3308/api/asset/${priceFilter}`;
            } else if (selectStatus) {
                url = `http://192.168.137.14:3308/api/asset/status?status=${selectStatus}`
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            if (searchCode || priceFilter || selectOffice || selectStatus) {
                setAsset(data);
            } else {
                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
                setAsset(data.asset);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
        }
    };

    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => prev - 1);
    // const handleFirstPage = () => setCurrentPage(1);
    // const handleLastPage = () => setCurrentPage(totalPages);
    const handlePageChange = (page) => setCurrentPage(page);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const visiblePages = 2;
        
        for (let i = 1; i <= visiblePages; i++) {
            pageNumbers.push(i);
          }
      
          // Add ellipsis if necessary
          if (currentPage > visiblePages + 1) {
            pageNumbers.push('...');
          }
      
          // Add pages around the current page
          for (let i = Math.max(visiblePages + 1, currentPage - 1); i <= Math.min(totalPages - visiblePages, currentPage + 1); i++) {
            pageNumbers.push(i);
          }
      
          // Add ellipsis if necessary
          if (currentPage < totalPages - visiblePages) {
            pageNumbers.push('...');
          }
      
          // Add last few pages
          for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
            if (i > visiblePages) { // Avoid adding pages that are already in the first few pages
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
        if (assetId != null) {
            try {
                const response = await AssetService.deleteAsset(assetId);
                if (response.ok) {
                    getAllAsset();
                } else {
                    throw new Error('Failed to delete asset');
                }
            } catch (error) {
                console.error('The ID given must not be null', error);
            }
        }
    };

    

    const handlerSelectStatusChange = (event) => setSelectStatus(event.target.value);
    const handlerSelectOfficeChange = (event) => setSelectOffice(event.target.value);
    const handleSearchCodeInputChange = (event) => setSearchCode(event.target.value);
    const handlePriceFilterChange = (event) => setPriceFilter(event.target.value);

    return (
        <div>
            <section>
                <div>
                    <div className="bg-white dark:bg-gray-800 relative shadow-xl rounded-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className='xxs:max-w-80 sm:max-w-full '>
                                <div className="md:w-full">
                                    <Typography className='text-left font-bold text-xl'>
                                        List Asset Over 250
                                    </Typography>
                                    
                                    {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                                    <div className='mt-10 flex flex-col'>
                                        <div className='flex flex-col items-start'>
                                            <input className='md:w-64 xxs:w-full focus:outline-none text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                                                type="text" value={searchCode} 
                                                onChange={handleSearchCodeInputChange} 
                                                placeholder="Search Code" 
                                            />
                                            <Link to={'/add-asset'}  className='xxs:w-full md:w-32 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center rounded-lg text-xs px-5 py-2.5 me-2 mb-2'>
                                                Add Asset
                                            </Link>
                                            <div className='xxs:w-full flex md:flex-row md:justify-start xxs:justify-between'>
                                                <Link to={'/asset/report'} className='xxs:w-full md:w-32 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2'>
                                                    Preview
                                                </Link>
                                                <ExportAsset excelData={assets} fileName={'List 31 06 2024 Over 250'} />
                                            </div>
                                        </div>
                                            
                                        <div className='sm:flex-col flex-wrap'>
                                            <select className='w-full sm:w-44 text-black border-x-0 border-t-0 font-medium focus:outline-none text-sm px-5 py-2.5 me-2 mb-2'
                                                value={priceFilter} onChange={handlePriceFilterChange}>
                                                <option value="" >Filter</option>
                                                <option value="asc">Ascending</option>
                                                <option value="desc">Descending</option>
                                            </select>
                                            <select className='w-full sm:w-44 text-black border-x-0 border-t-0  font-medium text-sm px-5 py-2.5 me-2 mb-2'
                                                value={selectOffice}
                                                onChange={handlerSelectOfficeChange}
                                                
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
                                            </select>
                                            
                                            <select className='w-full sm:w-44 text-black border-x-0 border-t-0 font-medium text-sm px-5 py-2.5 me-2 mb-2'
                                                value={selectStatus}
                                                onChange={handlerSelectStatusChange}
                                            >
                                                <option value=''>Status</option>
                                                <option value='1'>Active</option>
                                                <option value='0'>Inactive</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="pr-5 overflow-x-auto">
                                    <table className="w-auto text-black dark:text-white">
                                        <thead>
                                            <tr > 
                                                {TABLE_HEAD.map((head, index) => (
                                                        <th key={index} className="border border-blue-gray-100 bg-blue-gray-50">
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
                                                            <td className={classes}>
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {assets.name}
                                                                </Typography>
                                                            </td>
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
                                                            <td className={classes}>
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {assets.value}
                                                                </Typography>
                                                            </td>
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
                                                            {/* <td className={classes}>
                                                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                    {assets.other}
                                                                </Typography>
                                                            </td> */}
                                                            <td className={classes}>
                                                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                                                    {assets.office}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal text-xs"
                                                                    style={{
                                                                        backgroundColor: assets.status ? 'green' : 'red',
                                                                        padding: '5px',
                                                                        borderRadius: '4px',
                                                                        color: 'white', 
                                                                    }}
                                                                >
                                                                    {assets.status ? 'Active' : 'Inactive'}
                                                                </Typography>
                                                            </td>
                                                            <td className="py-3">
                                                                <Link className='w-20 mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5 me-2 mb-2 '
                                                                    to={`/asset/view/${assets.id}`}>View</Link>
                                                                <Link className='w-20 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5  me-2 mb-2 '
                                                                    to={`/edit-asset/${assets.id}`}>Edit</Link>
                                                                <Link  className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-2.5 py-1.5  me-2 mb-2 '
                                                                    onClick={() => deleteAsset(assets.id)}>Delete</Link>
                                                            </td>
                                                        </tr>
                                                        
                                                    );
                                                })} 
                                                
                                        </tbody>
                                    </table>
                                </div>
                                <Typography className='mt-5 mb-5'>
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
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        </Link>
                                    </li>
                                    {renderPageNumbers()}
                                    <li>
                                        <Link
                                        href="#"
                                        onClick={handleNextPage}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        </Link>
                                    </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Asset;
