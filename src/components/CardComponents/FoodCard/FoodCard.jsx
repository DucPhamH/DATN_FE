import React from 'react'
import { AiFillHeart, AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { BsFillLightningChargeFill } from 'react-icons/bs'

export default function FoodCard({ foodItem }) {
  return (
    <div className='border bg-white shadow-md dark:shadow-orange-900 dark:bg-color-primary border-gray-300 dark:border-gray-800 rounded-xl relative'>
      <div className='md:h-[18vh] xl:h-[22vh] rounded-t-xl scale-100 overflow-hidden'>
        <img
          src={foodItem.img}
          alt='blog'
          className='lg:h-full w-full object-cover hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='m-3'>
        <div className='hover:text-red-700 transition-all duration-300 cursor-pointer'>
          <span className='font-bold block text-base '>{foodItem.title}</span>
          <span className='block text-gray-400 text-xs'>Người viết: {foodItem.author}</span>
          <span className='block text-gray-400 text-xs'>Ngày viết: {foodItem.date}</span>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center pt-3'>
            <AiFillHeart className='mr-0.5 text-red-500' size={25} />
            <span className=' text-red-700 text-xs dark:text-gray-300'>{foodItem.like}</span>
          </div>
          <div className='flex items-center pt-3'>
            <BsFillLightningChargeFill className='mr-0.5 text-yellow-500' />
            <span className='text-xs font-mediumdark:text-gray-300'>Dễ</span>
          </div>
        </div>
      </div>
      <div className='bg-yellow-100 flex justify-center items-center text-gray-600 absolute p-1.5 text-sm rounded-full top-0 left-0 m-2'>
        <AiOutlineClockCircle size={20} />
        <span className='ml-1'>{foodItem.time}</span>
      </div>
      <div className='absolute top-[-6px] right-0 text-yellow-500'>
        <BsFillBookmarkFill className='' size={25} />
      </div>
    </div>
  )
}
