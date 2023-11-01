import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'

export default function MainLayout({ children }) {
  return (
    // <div className='flex justify-between dark:text-gray-300 dark:bg-color-primary-dark overflow-auto'>
    //   <SideBar />
    //   <div className='w-full'>
    //     <Header />
    //     <div className='h-[calc(100vh-88px)] mt-[88px] overflow-auto pt-5'>{children}</div>
    //   </div>
    // </div>
    <div className='flex justify-between dark:text-gray-300 dark:bg-color-primary-dark'>
      <SideBar />
      <div className='md:ml-64 max-h-full w-full'>
        <Header />
        <div className='mt-20'>{children}</div>
      </div>
    </div>
  )
}
