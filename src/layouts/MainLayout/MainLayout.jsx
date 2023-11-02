import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'

export default function MainLayout({ children }) {
  return (
    <div className='flex justify-between w-full h-full dark:text-gray-300 dark:bg-color-primary-dark'>
      <SideBar />
      <div className='md:ml-64 h-screen dark:bg-color-primary-dark w-full'>
        <Header />
        <div className='mt-20 dark:bg-color-primary-dark'>{children}</div>
      </div>
    </div>
  )
}
