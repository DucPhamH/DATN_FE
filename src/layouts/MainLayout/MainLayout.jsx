import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'

export default function MainLayout({ children }) {
  return (
    <div className='flex justify-between w-full bg-gray-100 h-full dark:text-gray-300 dark:bg-color-primary-dark'>
      <SideBar />
      <div className='md:ml-64 h-screen bg-gray-100 dark:bg-color-primary-dark w-full'>
        <Header />
        <div className='mt-20 bg-gray-100 dark:bg-color-primary-dark'>{children}</div>
      </div>
    </div>
  )
}
