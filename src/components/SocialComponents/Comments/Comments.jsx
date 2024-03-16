import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

export default function Comments() {
  return (
    <div className='pt-4 px-4 md:px-0'>
      <div className='relative'>
        <input
          className='pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20'
          type='text'
          placeholder='Viết bình luận'
        />
        <span className='flex absolute right-3 top-2/4 -mt-3 items-center'>
          <svg className='mr-2' style={{ width: 26, height: 26 }} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z'
            ></path>
          </svg>
          <svg className='fill-blue-500 dark:fill-slate-50' style={{ width: 24, height: 24 }} viewBox='0 0 24 24'>
            <path d='M2,21L23,12L2,3V10L17,12L2,14V21Z' />
          </svg>
        </span>
      </div>

      <div className='pt-6'>
        <div className='media flex pb-4'>
          <a className='mr-4' href='#'>
            <img className='rounded-full max-w-none w-12 h-12' src='https://randomuser.me/api/portraits/women/23.jpg' />
          </a>
          <div className='media-body'>
            <div>
              <a className='inline-block text-base font-bold mr-2' href='#'>
                Jerome Bell
              </a>
              <span className='text-slate-500 dark:text-slate-300'>2 ngày trước</span>
            </div>
            <p>T ăn bún đậu chấm nước mắm.</p>
            <div className='mt-2 flex items-center'>
              <a className='inline-flex items-center' href='#'>
                <AiFillHeart className='mr-1 text-red-500' size={20} />
                <span className=' font-bold'>69</span>
              </a>

              <button className='py-2 px-4 mx-1 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg'>
                Trả lời
              </button>
            </div>
          </div>
        </div>
        <div className='media flex pb-4'>
          <a className='inline-block mr-4' href='#'>
            <img className='rounded-full max-w-none w-12 h-12' src='https://randomuser.me/api/portraits/women/59.jpg' />
          </a>
          <div className='media-body'>
            <div>
              <a className='inline-block text-base font-bold mr-2' href='#'>
                Eleanor Pena
              </a>
              <span className='text-slate-500 dark:text-slate-300'>3 phút trước</span>
            </div>
            <p>T ăn bún đâu chấm sữa 😍😍✌🤪.</p>
            <div className='mt-2 flex items-center'>
              <a className='inline-flex items-center' href='#'>
                <AiFillHeart className='mr-1 text-red-500' size={20} />
                <span className=' font-bold'>69</span>
              </a>
              <button className='py-2 px-4 mx-1 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg'>
                Trả lời
              </button>
            </div>
            <div className='mt-4'>
              <div className='media flex pb-4'>
                <a className='mr-4' href='#'>
                  <img
                    className='rounded-full max-w-none w-10 h-10'
                    src='https://randomuser.me/api/portraits/men/23.jpg'
                  />
                </a>
                <div className='media-body'>
                  <div>
                    <a className='inline-block text-base font-bold mr-2' href='#'>
                      Joseph Diaz
                    </a>
                    <span className='text-slate-500 dark:text-slate-300'>5 phút trước</span>
                  </div>
                  <p>eo</p>
                  <div className='mt-2 flex items-center'>
                    <a className='inline-flex items-center' href='#'>
                      <AiFillHeart className='mr-1 text-red-500' size={20} />
                      <span className='font-bold'>69</span>
                    </a>
                    <button className='py-2 px-4 mx-1 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg'>
                      Repply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <a
            href='#'
            className='py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75'
          >
            Xem thêm bình luận
          </a>
        </div>
      </div>
    </div>
  )
}
