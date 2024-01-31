import React from 'react'

export default function FinessCard({ finessItem }) {
  return (
    <div className='flex items-center shadow-md dark:shadow-orange-900 p-4 bg-white rounded-lg  dark:bg-gray-800'>
      <div className={`p-3 mr-4 text-white rounded-full dark:text-white ${finessItem.color}`}>
        <img className='h-8 w-8' src={finessItem.image} alt='finess' />
      </div>
      <div>
        <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>{finessItem.name}</p>
        <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>{finessItem.description}</p>
      </div>
    </div>
  )
}
