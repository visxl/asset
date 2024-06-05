/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import AssetService from '../../Service/AssetService';
import { ExportAsset } from '../Export Function/ExportAsset';


// Table thead
const TABLE_HEAD = [ "Name", "Asset Name", "Model", "Brand", "Code", "Price", "Value", "Purchase Date", "Condition", "User", "Other", "Office", "Action"];
const classes = "border border-solid text-sm p-1 hover:bg-gray-300";

const Asset = () => {
    const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(0);
        const [totalItems, setTotalItems] = useState(0);
        const [assets, setAsset] = useState([]);

        const [searchCode, setSearchCode] = useState('');
        const [priceFilter, setPriceFilter] = useState('');
        const [selectOffice, setSelectOffice] = useState('');
        const [error, setError] = useState('');
    
        useEffect(() => {
            getAllAsset();
        }, [currentPage, searchCode, priceFilter, selectOffice]);

    const getAllAsset = async () => {
        try {
            let url = `http://192.168.1.94:3308/api/asset/page/${currentPage}`;
            if (searchCode) {
                url = `http://192.168.1.94:3308/api/asset/code?code=${searchCode}`;
            } else if (selectOffice) {
                url = `http://192.168.1.94:3308/api/asset/filter?office=${selectOffice}`;
            } else if (priceFilter) {
                url = `http://192.168.1.94:3308/api/asset/${priceFilter}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            if (searchCode || priceFilter || selectOffice) {
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
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);

    const deleteAsset = async (assetId) => {
        if (window.confirm('Are you sure you want to delete this?')) {
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

    const handlerSelectOfficeChange = (event) => setSelectOffice(event.target.value);
    const handleSearchCodeInputChange = (event) => setSearchCode(event.target.value);
    const handlePriceFilterChange = (event) => setPriceFilter(event.target.value);

    return (
        <div>
            <section>
                <Card className='w-full rounded-xl p-3 shadow-lg max-h-full'>
                    <Typography className='text-left font-bold text-xl'>
                        List Asset
                    </Typography>
                    {error && <div className='mt-5 text-red-700'>Error: {error}</div>}
                    <div className='flex flex-col md:flex-row mt-10'>
                        <Link to={'/add-asset'} className='w-auto md:w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                            Add Asset
                        </Link>
                        <Link to={'/asset/report'} className='w-auto md:w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                            Report
                        </Link>
                        <ExportAsset excelData={assets} fileName={'List Asset 31 06 2024 Over 250'} className='w-auto md:w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'/>
                        <select className='w-full md:w-64 text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            value={priceFilter} onChange={handlePriceFilterChange}>
                            <option value="" >Filter by price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <select className='w-full md:w-64 text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            value={selectOffice}
                            onChange={handlerSelectOfficeChange}
                        >
                            <option value=''>Select Office</option>
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
                        <input className='w-full md:w-64 focus:outline-none text-black border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            type="text" value={searchCode} 
                            onChange={handleSearchCodeInputChange} 
                            placeholder="Search by Code" 
                        />
                    </div>

                    <div className="relative">
                        <table className="w-full text-black table-auto">
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
                                    {assets
                                    .map(assets => {
                                        return ( 
                                            <tr key={assets.id} className={classes}>
                                                {/* <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.id}
                                                    </Typography>
                                                </td> */}
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.assetname}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.model}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.brand}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.code}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.price}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.value}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.condition}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.user}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.other}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {assets.office}
                                                    </Typography>
                                                </td>
                                                <td className="py-3">
                                                <Link className='w-28 mt-4 focus:outline-none text-white bg-green-500 hover:bg-green-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    to={`/asset/view/${assets.id}`}>View</Link>
                                                    <Link className='w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    to={`/edit-asset/${assets.id}`}>Edit</Link>
                                                    <Link className='w-20 mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                                                    onClick={ () => deleteAsset(assets.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        );
                                    })} 
                                    
                                </tbody>
                        </table>
                    </div>
                    <div className='pt-5 static'>
                        <Typography>
                            Total Asset: {totalItems}
                        </Typography>
                        <div className='float-end -mt-10 flex align-middle justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={handleFirstPage}
                                className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            >
                                First
                            </button>
                            <button disabled={currentPage === 1} onClick={handlePrevPage}
                                className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                            >
                                Previous
                            </button>
                            <Typography className='mt-4 p-2 pl-1'>{currentPage} / {totalPages}</Typography>
                            <button disabled={currentPage === totalPages} onClick={handleNextPage}
                                className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
                            >
                                Next
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={handleLastPage}
                                className='text-center w-28 mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                                Last
                            </button>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}

export default Asset;
