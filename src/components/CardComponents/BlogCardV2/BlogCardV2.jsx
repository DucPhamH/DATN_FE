import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

export default function BlogCardV2({ blogItem, imgClass, dateClass, titleClass, descriptionClass, linkClass }) {
  return (
    <div className='border border-gray-300 dark:shadow-orange-900 shadow-md dark:bg-color-primary bg-white dark:border-gray-800 rounded-xl'>
      <div className={imgClass}>
        <img
          src={blogItem.image}
          alt='blog'
          className='lg:h-full w-full object-cover hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='mx-3 mb-8'>
        <div className={dateClass}>
          <p>{blogItem.date}</p>
        </div>
        <a href='#blog' className={titleClass}>
          {blogItem.title}
        </a>
        <p className={descriptionClass}>{blogItem.description}</p>
        <div className='flex justify-between items-center'>
          <a href='#blog' className={linkClass}>
            <span className=' text-sm font-normal transition-all duration-200 text-red-600 dark:text-gray-300 dark:border-none dark:bg-gray-800 hover:text-red-800 dark:hover:text-red-400 p-1 border rounded border-red-500'>
              + Lưu lại
            </span>
            <span className='ml-1 text-sm font-medium text-gray-400'>13k lượt lưu</span>
          </a>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <AiFillHeart className='mr-0.5 text-red-500' size={25} />
              <span className='font-medium text-gray-700'>13k</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
