import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'

export default function MainLayout({ children }) {
  return (
    <div className='flex justify-between dark:text-gray-300 dark:bg-color-primary-dark'>
      <SideBar />
      <div className='w-full'>
        <Header />
        <div className='mt-32'>{children}</div>
      </div>
    </div>
  )
}
