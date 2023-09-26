import React from 'react'
import SideBar from '../../components/GlobalComponents/SideBar'
import Header from '../../components/GlobalComponents/Header'

export default function MainLayout({ children }) {
  return (
    <div className='flex justify-between dark:text-gray-300 dark:bg-color-primary-dark overflow-auto'>
      <SideBar />
      <div className='w-full'>
        <Header />
        <div className='h-[calc(100vh-88px)] mt-[88px] pt-12 pl-10 overflow-auto'>{children}</div>
      </div>
    </div>
  )
}
