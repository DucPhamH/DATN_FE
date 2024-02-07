import React from 'react'

export default function BlogCard({ blogItem, imgClass, dateClass, titleClass, descriptionClass, linkClass }) {
  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded-xl'>
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
        <a href='#blog' className={linkClass}>
          <span className='tracking-wider capitalize underline hover:no-underline'>Xem thêm</span>
        </a>
      </div>
    </div>
  )
}
