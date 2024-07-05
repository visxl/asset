import React, { useEffect, useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';
import PropTypes from 'prop-types';

export const ExportAsset250 = ({ fileName }) => {
  const [excelData, setExcelData] = useState([]);
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  useEffect(() => {
    fetchExcelData();
  }, []);

  const fetchExcelData = async () => {
    try {
      const response = await fetch('http://192.168.137.14/api/asset250/report');
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
      <button content="Excel Export" className='xxs:w-full md:w-32 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-xs px-2 py-2.5 md:me-2 sm:me-2 mb-2 '
        onClick={exportToExcel}
      >
        Export
      </button>
  );
};

ExportAsset250.propTypes = {
  excelData: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired,
};
