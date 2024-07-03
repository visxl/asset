"use client";
import { HiArrowLeft, HiBookOpen, HiChartPie, HiChevronDoubleLeft, HiChevronDoubleRight, HiCog, HiUser, HiUserCircle, HiUserGroup, HiUsers, HiViewList } from "react-icons/hi";
import { Drawer, Sidebar } from "flowbite-react";
import { useState } from 'react';
import LOGO from '../asset/Banner.jpg';

export default function AppSidebar() {
  const userId = localStorage.getItem('userId');
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 h-screen">
        <div className="flex justify-between bg-white">
          <img src={LOGO} alt="logo" className={`transition-all duration-300 ${isOpen ? 'w-44' : 'w-0 opacity-0'}`} />
          <button onClick={toggleOpen} className="p-5 rounded-lg transition-all duration-300 hover:bg-gray-300">
            {isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight/>}
          </button>
        </div>
        <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} h-full`}>
          <Drawer id="drawer" open={isOpen} onClose={toggleClose} className={`!px-0 !py-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} h-full`}>
            <Drawer.Items className={`!px-0 !py-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 hidden'} h-full`}>
              <Sidebar className="h-full">
                <Sidebar.Items className="!px-0 !py-0 h-full">
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>Dashboard</Sidebar.Item>
                    <Sidebar.Item href={`/users/profile/${userId}`} icon={HiUser}>Profile</Sidebar.Item>
                    <Sidebar.Item href="/users" icon={HiUserGroup}>Users</Sidebar.Item>
                    <Sidebar.Collapse icon={HiViewList} label="Asset">
                      <Sidebar.Item href="/asset">Asset</Sidebar.Item>
                      <Sidebar.Item href="/asset250">Asset Under 250</Sidebar.Item>
                      <Sidebar.Item href="/request">Request</Sidebar.Item>
                      <Sidebar.Collapse icon={HiUserCircle} label="Supplier">
                        <Sidebar.Item href="/supplier">Supplier</Sidebar.Item>
                      </Sidebar.Collapse>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="/customer" icon={HiUsers}>Customer</Sidebar.Item>
                    <Sidebar.Item href="/task" icon={HiBookOpen}>Task</Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup className="flex-1">
                    <Sidebar.Item href={`/users/setting/${userId}`} icon={HiCog}>Setting</Sidebar.Item>
                    <Sidebar.Item href="/login" icon={HiArrowLeft}>Logout</Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </Sidebar>
            </Drawer.Items>
          </Drawer>
        </div>
      </div>
    </>
  );
}
