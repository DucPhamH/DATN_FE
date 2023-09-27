import React from 'react'
import SearchInput from './SearchInput'
import { BsFacebook } from 'react-icons/bs'
import { AiFillMessage } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io'

export default function Header() {
  return (
    <div className='flex px-8 pt-8 py-5 w-screen justify-between transition-all duration-500 z-30 bg-white dark:bg-color-primary  shadow-md dark:shadow-yellow-800 fixed'>
      {/* <h4 className='dark:text-white mx-10 text-gray-900 flex items-center font-black cursor-pointer text-3xl'>
        <span className='text-red-500'>Cook</span>Healthy
      </h4> */}
      <div className='ml-10'>
        <SearchInput />
      </div>
      <div className='mr-64 flex justify-center items-center'>
        <div className='dark:bg-slate-600 dark:hover:bg-slate-500 dark:border-none text-2xl hover:bg-yellow-200 transition-all duration-300 cursor-pointer border text-red-600 dark:text-white shadow-lg font-normal h-8 w-8 md:h-10 md:w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-3'>
          <AiFillMessage />
        </div>
        <div className='dark:bg-slate-600 dark:hover:bg-slate-500 dark:border-none text-2xl hover:bg-yellow-200 transition-all duration-300 cursor-pointer border text-red-600 dark:text-white shadow-lg font-normal h-8 w-8 md:h-10 md:w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-3'>
          <IoMdNotifications />
        </div>
        <img className='md:w-12 border dark:border-none md:h-12 w-10 h-10 mr-3 rounded-full' src='' alt='user photo' />
      </div>
    </div>
  )
}
