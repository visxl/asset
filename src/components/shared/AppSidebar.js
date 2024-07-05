import React, { useState } from 'react';
import { Button, Drawer, Sidebar } from 'flowbite-react';
import LOGO from '../asset/Banner.jpg';
import { HiArrowLeft,HiChartPie, HiDotsHorizontal, HiCog, HiUser, HiViewList } from 'react-icons/hi';

export default function AppSidebar() {
  
  const userId = localStorage.getItem('userId');
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
            <div className="items-center justify-center">
                <Button onClick={() => setIsOpen(true)} className='text-black pb-2 pt-2'><HiDotsHorizontal /></Button>
            </div>

            <Drawer open={isOpen} onClose={handleClose} className='h-full'>
                <div>
                  <img src={LOGO} alt='logo' className='w-56'/>
                </div>
                <Drawer.Items>
                    <Sidebar aria-label='Sidebar with multi-level dropdown' className='[&>div]:bg-transparent [&>div]:p-0'>
                        <div className="flex h-full flex-col justify-between py-2">
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                  <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item>
                                  <Sidebar.Item href={`/users/profile/${userId}`} icon={HiUser}>
                                    Profile
                                  </Sidebar.Item>
                                  <Sidebar.Collapse  icon={HiViewList} label='Asset' className='gap-3'>
                                    <Sidebar.Item href='/asset' >
                                      Asset Over 250
                                    </Sidebar.Item>
                                    <Sidebar.Item href='/asset250'>
                                      Asset Under 250
                                    </Sidebar.Item>
                                    <Sidebar.Item>
                                      Supplier
                                    </Sidebar.Item>
                                    <Sidebar.Item>
                                      Repair List
                                    </Sidebar.Item>
                                  </Sidebar.Collapse>
                                  {/* <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item>
                                  <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item>
                                  <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item>
                                  <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item>
                                  <Sidebar.Item href='/' icon={HiChartPie}>
                                    Dashboard
                                  </Sidebar.Item> */}
                                </Sidebar.ItemGroup>

                                <Sidebar.ItemGroup>
                                  <Sidebar.Item href={`/user/setting/${userId}`} icon={HiCog}>
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