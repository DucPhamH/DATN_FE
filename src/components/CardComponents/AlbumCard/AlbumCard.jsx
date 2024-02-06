import React from 'react'

export default function AlbumCard() {
  return (
    <div className='card bg-base-100 shadow-md image-full'>
      <figure className='h-[24rem]'>
        <img
          src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg'
          alt='card'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title line-clamp-2 text-white hover:underline cursor-pointer'>
          40+ Cách Nấu Canh Chua Ba Miền
        </h2>
        <p className='text-gray-300'>30 công thức</p>
        <div className='card-actions justify-end'>
          <button className='btn bg-red-900 text-white hover:bg-red-800'>Xem ngay !</button>
        </div>
      </div>
    </div>
  )
}
