import React from 'react'
import { AiFillHeart, AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'

export default function FoodCard({ foodItem }) {
  return (
    <div className='border bg-white shadow-sm dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-xl relative'>
      <div className='lg:h-[28vh] rounded-t-xl scale-100 overflow-hidden'>
        <img
          src={foodItem.img}
          alt='blog'
          className='lg:h-full w-full object-cover hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='m-4'>
        <div className='hover:text-red-700 transition-all duration-300 cursor-pointer'>
          <span className='font-bold block pb-1 text-xl '>{foodItem.title}</span>
          <span className='block text-gray-400 text-sm'>Người viết: {foodItem.author}</span>
          <span className='block text-gray-400 text-sm'>Ngày viết: {foodItem.date}</span>
        </div>
        <div>
          <div className='flex items-center justify-between pt-3'>
            <span className='italic text-red-700 dark:text-gray-300'>{foodItem.like}</span>
            <AiFillHeart className='ml-2 text-red-500' size={30} />
          </div>
        </div>
      </div>
      <div className='bg-yellow-100 flex justify-center items-center text-gray-600 absolute p-1.5 text-sm rounded-full top-0 left-0 m-2'>
        <AiOutlineClockCircle size={20} />
        <span className='ml-1'>{foodItem.time}</span>
      </div>
      <div className='absolute top-[-6px] right-0 text-yellow-500'>
        <BsFillBookmarkFill className='' size={30} />
      </div>
    </div>
  )
}
