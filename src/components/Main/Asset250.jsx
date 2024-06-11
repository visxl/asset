/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Asset250Service from '../../Service/Asset250Service';
import { ExportAsset250 } from '../Export Function/ExportAsset250';


// Table thead
const TABLE_HEAD = ["Name", "Asset Name", "Model", "Brand", "Code", "Price", "Value", "Purchase Date", "Condition", "User", "Office", "Action"];
const classes = "border border-solid text-sm p-1 hover:bg-gray-300";

    const Asset250 = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(0);
        const [totalItems, setTotalItems] = useState(0);
        const [asset250, setAsset250] = useState([]);

        const [searchCode, setSearchCode] = useState('');
        const [priceFilter, setPriceFilter] = useState('');
        const [selectOffice, setSelectOffice] = useState('');
        const [error, setError] = useState('');
    
        useEffect(() => {
            getAllAsset250();
        }, [currentPage, searchCode, priceFilter, selectOffice]);
    
        const getAllAsset250 = async () => {
            try {
                let url = `http://localhost:8081/api/asset250/page/${currentPage}`;
                if (searchCode) {
                    url = `http://localhost:8081/api/asset250/code?code=${searchCode}`;
                } else if (selectOffice) {
                    url = `http://localhost:8081/api/asset250/office?office=${selectOffice}`;
                } else if (priceFilter) {
                    url = `http://localhost:8081/api/asset250/${priceFilter}`;
                }
    
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
    
                if (searchCode || priceFilter || selectOffice) {
                    setAsset250(data);
                } else {
                    setTotalPages(data.totalPages);
                    setTotalItems(data.totalItems);
                    setAsset250(data.asset250);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };
    
        const handleNextPage = () => setCurrentPage(prev => prev + 1);
        const handlePrevPage = () => setCurrentPage(prev => prev - 1);
        const handleFirstPage = () => setCurrentPage(1);
        const handleLastPage = () => setCurrentPage(totalPages);
    
        const deleteAsset250 = async (asset250Id) => {
            if (window.confirm('Are you sure you want to delete this?')) {
                try {
                    const response = await Asset250Service.deleteAsset250(asset250Id);
                    if (response.ok) {
                        getAllAsset250();
                    } else {
                        throw new Error('Failed to delete asset');
                    }
                } catch (error) {
                    console.error('The ID given must not be null', error);
                }
            }
        };
    
        const handlerSelectOfficeChange = (event) => setSelectOffice(event.target.value);
        const handleSearchCodeInputChange = (event) => setSearchCode(event.target.value);
        const handlePriceFilterChange = (event) => setPriceFilter(event.target.value);

    return (
        <body>
            <section>
                <Card className='w-full rounded-xl p-3 h-full shadow-lg'>
                    <Typography className='text-left font-bold text-xl'>
                        List Asset 250
                    </Typography>
                        {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                    <div className='flex mt-10'>
                        <Link to={'/add-asset250'} className='w-36 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>
                            Add Asset250
                        </Link>
                        <Link to={'/asset250/report'} className='w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>
                            Report
                        </Link>
                        <ExportAsset250 excelData={asset250} fileName={'List Asset 31 06 2024 Under 250'} className='w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '/>
                        <select className='w-64 focus:outline-none  border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            value={priceFilter} onChange={handlePriceFilterChange}>
                            <option value="">Filter by price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <select className='w-64 focus:outline-none border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                        value={selectOffice}
                        onChange={handlerSelectOfficeChange}
                        >
                            <option value='' disabled>Select Office</option>
                            <option value='Administrator'>Administrator</option>
                            <option value='Cashier'>Cashier</option>
                            <option value='CustomerService'>CustomerService</option>
                            <option value='Claim'>Claim</option>
                            <option value='AccountingAndFinance'>AccountingAndFinance</option>
                            <option value='InternalAudit'>InternalAudit</option>
                            <option value='Technical'>Technical</option>
                            <option value='MarketingAndSale'>MarketingAndSale</option>
                            <option value='KampongCham'>KampongCham</option>
                            <option value='Takeo'>Takeo</option>
                            <option value='BanteayMeanchey'>BanteayMeanchey</option>
                            <option value='Battambang'>Battambang</option>
                            <option value='Preyveng'>Preyveng</option>
                            <option value='ShianoukVille'>ShianoukVille</option>
                            <option value='Siemreap'>Siemreap</option>
                            <option value='InformationTechnology'>InformationTechnology</option>
                        </select>
                        <input className='w-64 focus:outline-none text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                            type="text" value={searchCode} 
                            onChange={handleSearchCodeInputChange} 
                            placeholder="Search by Code" 
                        />
                    </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm  text-black">
                                <thead>
                                    <tr>
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
                                    {asset250 && asset250
                                    .map(asset250 => {
                                        return ( 
                                            <tr key={asset250.id} className={classes}>
                                                {/* <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.id}
                                                    </Typography>
                                                </td> */}
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.assetname}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.model}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.brand}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.code}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.price}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.value}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.condition}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.user}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {asset250.office}
                                                    </Typography>
                                                </td>
                                                <td className="py-3">
                                                <Link className='w-28 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    to={`/asset250/view/${asset250.id}`}>View</Link>
                                                    <Link className='w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    to={`/edit-asset250/${asset250.id}`}>Edit</Link>
                                                    <Link className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    onClick={ () => deleteAsset250(asset250.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        );
                                    })} 
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className='pt-5 static'>
                            <Typography>
                                Total Asset 250 : {totalItems} 
                            </Typography>
                            <div className='float-end -mt-10 flex align-middle justify-center'>
                                <Link
                                    disabled={currentPage === 1}
                                    onClick={handleFirstPage}
                                    className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                                    >
                                    First
                                </Link>
                                <Link disabled={currentPage === 1} onClick={handlePrevPage}
                                    className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                >
                                    Previous
                                </Link>
                                <Typography className='mt-4 p-2 pl-1'>{currentPage} / {totalPages}</Typography>
                                <Link disabled={currentPage === totalPages} onClick={handleNextPage}
                                    className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                >
                                    Next
                                </Link>
                                <Link
                                    disabled={currentPage === totalPages}
                                    onClick={handleLastPage}
                                    className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                    Last
                                </Link>
                            </div> 
                        </div>
                </Card>
            </section>
        </body>
    );
}

export default Asset250;
