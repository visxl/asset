import React, { useState } from 'react';
import { Button, Drawer, Sidebar } from 'flowbite-react';
import LOGO from '../asset/Logo.png'
import { HiArrowLeft,HiChartPie, HiDotsHorizontal, HiCog, HiUser, HiViewList, HiBookOpen, HiX, HiSearch } from 'react-icons/hi';

export default function AppSidebar() {
  
  const userId = localStorage.getItem('userId');
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
          <div className="items-center justify-center">
            <Button onClick={handleOpen} className='text-gray-500 dark:text-white pb-2 pt-2 border-none hover:bg-gray-100 dark:hover:bg-gray-600'>
              {isOpen ? <HiX /> : <HiDotsHorizontal />}
            </Button>
          </div>

          <Drawer open={isOpen} onClose={handleClose} className='h-full w-72'>
            <div className='md:invisible md:w-0'>
              <img src={LOGO} alt='logo' className='w-56'/>
            </div>
            <Drawer.Items>
              <Sidebar aria-label='Sidebar with multi-level dropdown' className='[&>div]:bg-transparent [&>div]:p-0'>
                <div className="flex h-full flex-col justify-between py-2">
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <div className=' items-center xxs:w-full md:max-w-sm md:invisible md:h-0'>
                        <label for="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
                            <HiSearch className='text-black dark:text-gray-200'/>
                          </div>
                          <input type="text" id="simple-search" 
                            className="dark:text-gray-200 bg-gray-50 border dark:bg-gray-600 border-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 text-sm rounded-lg block w-80 xxs:w-full ps-10 h-12 " 
                            placeholder="Search " 
                          />
                        </div>
                      </div>
                      <Sidebar.Item href='/' icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href={`/users/profile/${userId}`} icon={HiUser}>
                        Profile
                      </Sidebar.Item>
                      <Sidebar.Collapse  icon={HiViewList} label='Asset' className=''>
                        <Sidebar.Item href='/asset' >
                          Asset Over 250
                        </Sidebar.Item>
                        <Sidebar.Item href='/asset250'>
                          Asset Under 250
                        </Sidebar.Item>
                        <Sidebar.Item href='/supplier'>
                          Supplier
                        </Sidebar.Item>
                        <Sidebar.Item href='/repair'>
                          Repair List
                        </Sidebar.Item>
                      </Sidebar.Collapse>
                      <Sidebar.Item href='/task' icon={HiBookOpen}>
                        Task
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    <Sidebar.ItemGroup>
                      <Sidebar.Item href={`/users/setting/${userId}`} icon={HiCog}>
                        Setting
                      </Sidebar.Item>
                      <Sidebar.Item href='/login' icon={HiArrowLeft}>
                        Sign Out
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </Sidebar>
            </Drawer.Items>
          </Drawer>
        </>
  );
}