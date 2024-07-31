/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { useEffect, useState, useCallback } from 'react';
import Line from '../shared/Line';
import Pie from '../shared/Pie';
import { HiArrowSmRight } from 'react-icons/hi';
import { Button } from 'flowbite-react';
// import Chat from './Chat';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsCustomer, setTotalItemsCustomer] = useState(0);
  const [customer, setCustomer] = useState([]);
  const [totalItems250, setTotalItems250] = useState(0);
  const [asset250, setAsset250] = useState([]);
  const [asset, setAssets] = useState([]);
  const [totalItemsUser, setTotalItemsUser] = useState(0);
  const [user, setUser] = useState([]);
  const [supplier, setSuppliers] = useState([])
  const [totalItemsSupplier, setTotalItemsSupplier] = useState(0);

  const fetchData = useCallback(async (endpoint, setData, setTotalItems) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTotalItems(data.totalItems);
      setData(data[Object.keys(data).filter(key => key !== 'totalItems')[0]]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData(`http://192.168.137.14:3308/api/asset/page/${currentPage}`, setAssets, setTotalItems);
    fetchData(`http://192.168.137.14:3308/api/asset250/page/${currentPage}`, setAsset250, setTotalItems250);
    fetchData(`http://192.168.137.14:3308/api/customer/page/${currentPage}`, setCustomer, setTotalItemsCustomer);
    fetchData(`http://192.168.137.14:3308/api/users/page/${currentPage}`, setUser, setTotalItemsUser);
    fetchData(`http://192.168.137.14:3308/api/supplier/page/${currentPage}`, setSuppliers, setTotalItemsSupplier);
  }, [currentPage, fetchData]);

  const renderCard = (title, list, totalItems, link) => (
    <Card 
      className=" xxs:w-full md:w-56 md:flex md:flex-wrap md:justify-start gap-2 shadow-lg dark:bg-gray-700">
      <CardBody className='text-center'>
        <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-gray-200">
          {title}
        </Typography>
        <Typography className='pb-2 dark:text-gray-200'>
          List {list}
        </Typography>
        <Typography className='pb-1 pt-1 dark:text-gray-200'>
          Total {list}: {totalItems}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-5 text-center dark:text-gray-200">
        <Button href={link} 
          className="w-full focus:outline-none text-black dark:text-gray-200 bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500">
            More<HiArrowSmRight className='w-5 h-5 ml-2 '/> 
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <body>
      <section className="p-3">
        <Typography variant="h4" color="blue-gray" className="mb-5 dark:text-gray-200">
          Quick Links
        </Typography>
        <div className="flex flex-wrap gap-3">
          {renderCard("Asset", "Asset", totalItems, "/asset")}
          {renderCard("Asset 250", "Asset 250", totalItems250, "/asset250")}
          {renderCard("Department", "Department", totalItems, "/department")}
          {renderCard("User", "User", totalItemsUser, "/users")}
          {renderCard("Customer", "Customer", totalItemsCustomer, "/customer")}
          {renderCard("Supplier", "Supplier", totalItemsSupplier, "/supplier")}            
        </div>

          <Typography variant="h4" color="blue-gray" className="mb-5 mt-10 text-2xl dark:text-gray-200">
            Charts
          </Typography>
          <div className="xxs:flex xxs:flex-wrap md:w-full md:grid md:grid-cols-2 md:gap-3 md:justify-between md:align-middle">
            <div className="w-full">
              <Line />
            </div>
            <div className="w-full">
              <Pie />
            </div>
          </div>
      </section>
      {/* <Chat/> */}
    </body>
  );
}
