import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import LOGO from '../asset/Banner.jpg'
import AppSidebar from './AppSidebar'
import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from 'flowbite-react'
import AppFooter from './AppFooter'
import { HiBell, HiSearch, HiViewGrid } from 'react-icons/hi'
import LOGO from '../asset/Logo.png'
import UserService from '../../Service/UserService'

export default function Layout() {
  const [userData, setUserData] = useState({
    engName: '',
    email: '',
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      UserService.getUserById(userId)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user by ID:', error);
        });
    }
  }, [navigate]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Flowbite>
      <div className='flex bg-white dark:bg-gray-800 h-full'>
        <div className='flex flex-row absolute w-full justify-between p-3 shadow-md dark:bg-gray-900'>
          <div className='flex justify-start align-middle items-center gap-1'>
            <AppSidebar/>
            <div className='mr-2 xxs:visible xxs:w-0 md:visible md:w-44 md:mr-5'>
              <img src={LOGO} alt='logo' className='w-44 ml-2'/>
            </div>

            <div className=' items-center w-48 xxs:w-0 xxs:invisible md:visible'>
              <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
                    <HiSearch className='text-black dark:text-gray-200 ml-2'/>
                  </div>
                  <input type="text" id="simple-search" 
                    className="dark:text-gray-200 bg-gray-50 border dark:bg-gray-600 border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm rounded-lg block w-80 ps-10 h-10 ml-2 mt-2" 
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange} 
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end align-middle items-center gap-1'>
              <div className='p-3 rounded-lg text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500'>
                <HiBell 
                  className='w-5 h-5'
                />
              </div>
              <div className='p-3 rounded-lg text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500'>
              <HiViewGrid 
                  className='w-5 h-5'
                />
              </div>
              <DarkThemeToggle className=' px-3 py-3 border-none '/>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" rounded bordered />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm mb-2">{userData.engName}</span>
                  <span className="block truncate text-sm font-medium">{userData.email}</span>
                </Dropdown.Header>
                <hr className="border-t dark:border-gray-500" />
                <Dropdown.Item href={`/users/profile/${userId}`}>Profile</Dropdown.Item>
                <Dropdown.Item href={`/users/setting/${userId}`}>Settings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
        </div>
        <div className='p-3 w-full mt-20'>
          <Outlet/>  
          <AppFooter />
        </div> 
      </div>
    </Flowbite>
    
  )
}