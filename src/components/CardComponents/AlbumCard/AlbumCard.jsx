import React from 'react'

export default function AlbumCard() {
  return (
    <div className='card bg-base-100 shadow-md image-full'>
      <figure className='h-[22rem]'>
        <img
          src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg'
          alt='card'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title mt-10 line-clamp-2 text-white hover:underline cursor-pointer'>
          40+ Cách Nấu Canh Chua Ba Miền
        </h2>
        <p className='text-gray-300'>30 công thức</p>
        <div className='card-actions justify-end'>
          <button className='btn bg-gray-200 py-1 px-2 text-gray-700 hover:bg-gray-300'>Xem ngay !</button>
        </div>
      </div>
    </div>
  )
}
