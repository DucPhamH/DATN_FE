import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ModalUploadAvatar({ closeModalAvatar }) {
  return (
    <div className='modal '>
      <div className='overlay' onClick={() => closeModalAvatar()}></div>
      <div className='modal-content dark:bg-gray-900 bg-[#f7f1db]'>
        <div className='relative w-full max-w-md max-h-full'>
          <div
            onClick={() => closeModalAvatar()}
            className='absolute right-0 top-[-0.5rem] rounded-full transition-all duration-300  cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 flex justify-center items-center h-8 w-8  dark:text-yellow-400 font-extrabold'
          >
            <AiOutlineClose />
          </div>
          <div className='p-6 text-center'>
            <h3 className='mb-6 font-medium text-xl md:text-2xl text-black dark:text-gray-200'>Chọn ảnh đại diện</h3>
            <div className='flex justify-between'>
              <button
                type='button'
                className='text-black bg-slate-100 transition-all duration-300 hover:bg-red-400 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
              >
                Xác nhận
              </button>
              <button
                type='button'
                onClick={() => closeModalAvatar()}
                className='text-black bg-red-300 transition-all duration-300 hover:bg-red-500 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
