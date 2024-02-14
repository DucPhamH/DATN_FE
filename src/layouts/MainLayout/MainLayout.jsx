import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'
import Footer from '../../components/GlobalComponents/Footer'

export default function MainLayout({ children }) {
  return (
    <div className='flex justify-between text-gray-800 w-full bg-gray-100 h-full dark:text-gray-300 dark:bg-color-primary-dark'>
      <SideBar />
      <Header />
      <div className='md:ml-64 h-screen bg-gray-100 dark:bg-color-primary-dark w-[100%]'>
        <div className='mt-20 bg-gray-100 dark:bg-color-primary-dark'>
          {children}
          <div className='mt-20'>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
