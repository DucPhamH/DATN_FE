import React from 'react'

export default function BlogCard({ blogItem }) {
  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded-xl'>
      <div className='lg:h-[40vh] rounded-t-xl scale-100 overflow-hidden'>
        <img
          src={blogItem.image}
          alt='blog'
          className='lg:h-full w-full hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='mx-3 mb-8'>
        <div className='flex items-center gap-5 py-5'>
          <p>{blogItem.date}</p>
        </div>
        <a href='#blog' className='text-2xl font-bold  hover:text-color-secondary'>
          {blogItem.title}
        </a>
        <p className='leading-relaxed line-clamp-2 my-5'>{blogItem.description}</p>
        <a
          href='#blog'
          className='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
        >
          <span className='tracking-wider capitalize underline hover:no-underline'>Read more</span>
        </a>
      </div>
    </div>
  )
}
