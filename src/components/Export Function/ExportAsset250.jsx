import React, { useEffect, useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';
import { HiDownload } from 'react-icons/hi';

export const ExportAsset250 = ({ fileName }) => {
  const [excelData, setExcelData] = useState([]);
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  useEffect(() => {
    fetchExcelData();
  }, []);

  const fetchExcelData = async () => {
    try {
      const response = await fetch('http://192.168.137.14:3308/api/asset250/report');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setExcelData(data);
    } catch (error) {
      console.error('Error fetching Excel data:', error);
    }
  };

  const exportToExcel = async () => {
    if (!Array.isArray(excelData) || excelData.length === 0) {
      console.error('Invalid data provided to export to Excel.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button content="Excel Export" className='text-black dark:text-gray-200 text-sm xxs:w-full md:w-36 mb-2 mr-2 dark:focus:ring-gray-500 dark:focus:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900'
      onClick={exportToExcel}
    >
      <HiDownload className='mr-2 w-5 h-5'/>
      Export CSV
  </Button>
  );
};

ExportAsset250.propTypes = {
  excelData: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired,
};
