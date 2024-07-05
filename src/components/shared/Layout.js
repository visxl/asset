import React from 'react'
import { Outlet } from 'react-router-dom'
// import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
// import AppFooter from './AppFooter'

export default function Layout() {
  return (
    <div className='flex'>
      
        {/* <AppHeader /> */}
      <div className='p-3'>
        <AppSidebar/>
        < Outlet/>
      </div>
    </div>
  )
}