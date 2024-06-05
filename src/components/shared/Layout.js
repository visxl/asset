import React from 'react'
import { Outlet } from 'react-router-dom'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
// import AppFooter from './AppFooter'

export default function Layout(){
  return (
    <div className='flex flex-row bg-neutral-100 h-full w-full'>
      <div className='sticky top-0 h-96'>
        <AppSidebar className='sticky overflow-hidden'/>
      </div>
      <div className='w-full static'>
        <AppHeader />
        <div className='px-5 py-5 ' >
          <Outlet className='bg-gray-200'/>
        </div>
        {/* <AppFooter className='relative'/> */}
      </div>
    </div>
  )
}
