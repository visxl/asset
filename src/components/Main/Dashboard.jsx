/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Line from '../shared/Line';
import Pie from '../shared/Pie';
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
    fetchData(`http://localhost:8081/api/asset/page/${currentPage}`, setAssets, setTotalItems);
    fetchData(`http://localhost:8081/api/asset250/page/${currentPage}`, setAsset250, setTotalItems250);
    fetchData(`http://localhost:8081/api/customer/page/${currentPage}`, setCustomer, setTotalItemsCustomer);
    fetchData(`http://localhost:8081/api/users/page/${currentPage}`, setUser, setTotalItemsUser);
  }, [currentPage, fetchData]);

  const renderCard = (title, list, totalItems, link) => (
    <Card className="w-60 p-5 flex flex-col justify-center mr-5 shadow-lg">
      <CardBody className='text-center'>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className='pb-2'>
          List {list}
        </Typography>
        <Typography className='pb-2 pt-2'>
          Total {list}: {totalItems}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-5 text-center">
        <Link to={link} className="w-full focus:outline-none text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">See More</Link>
      </CardFooter>
    </Card>
  );

  return (
    <body>
      <section className="p-5">
        <Card className="p-5 shadow-lg">
          <Typography variant="h4" color="blue-gray" className="mb-5">
            Quick Links
          </Typography>
          <div className="flex flex-wrap justify-start">
            {renderCard("Asset", "Asset", totalItems, "/asset")}
            {renderCard("Asset Under 250", "Asset Under 250", totalItems250, "/asset250")}
            {renderCard("Department", "Department", totalItems, "/department")}
            {renderCard("User", "User", totalItemsUser, "/users")}
            {renderCard("Customer", "Customer", totalItemsCustomer, "/customer")}
            
          </div>
        </Card>

        <Card className="mt-6 px-2 py-2 shadow-lg h-auto">
          <Typography variant="h4" color="blue-gray" className="mb-5 text-2xl">
            Charts
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <Line />
            </div>
            <div className="w-full">
              <Pie />
            </div>
          </div>
        </Card>
      </section>
      {/* <Chat/> */}
    </body>
  );
}
