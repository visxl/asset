import React from 'react'
import { Outlet } from 'react-router-dom'
// import LOGO from '../asset/Banner.jpg'
import AppSidebar from './AppSidebar'
import { DarkThemeToggle, Flowbite } from 'flowbite-react'
import AppFooter from './AppFooter'

export default function Layout() {
  return (
    <Flowbite>
      <div className='flex bg-white dark:bg-gray-800 h-full'>
        <div className='flex flex-row absolute p-3 w-full justify-between '>
            <AppSidebar/>
            <DarkThemeToggle className='w-12 h-12 border'/>
            
        </div>
        
          <div className='p-3 w-full mt-10'>
            <Outlet/>  
            <AppFooter />
          </div>
        
      </div>
    </Flowbite>
    
  )
}