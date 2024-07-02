import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
// import AppFooter from './AppFooter'

export default function Layout() {
  return (
    <div className='flex'>
      <AppSidebar/>
      <div className='md:w-full'>
        <AppHeader />
        <div className='px-2 py-5 h-full'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
