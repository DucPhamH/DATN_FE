import React, { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function ModalUploadAvatar({ closeModalAvatar }) {
  const inputRef = useRef(null)
  const [image, setImage] = useState('')
  const handleImageClick = () => {
    inputRef.current.click()
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setImage(file)
  }
  // console.log(image)
  const handleUpload = () => {
    var formData = new FormData()
    console.log(image)
    formData.append('avatar', image)
    console.log(formData.append)
    toast.success('upload avatar thành công')
    //ghep api o day
  }
  return (
    <div className='modal '>
      <div className='overlay' onClick={() => closeModalAvatar()}></div>
      <div className='modal-content min-w-[360px] md:min-w-[400px] dark:bg-gray-900 bg-[#f7f1db]'>
        <div className='relative w-full max-w-md max-h-full'>
          <div
            onClick={() => closeModalAvatar()}
            className='absolute right-0 top-[-0.5rem] rounded-full transition-all duration-300  cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 flex justify-center items-center h-8 w-8  dark:text-yellow-400 font-extrabold'
          >
            <AiOutlineClose />
          </div>
          <div className='p-6 text-center'>
            <h3 className='mb-6 font-medium text-xl md:text-2xl text-black dark:text-gray-200'>Chọn ảnh đại diện</h3>
            <section className='w-full mx-auto items-center '>
              <div className='max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center'>
                <div className='px-4 py-6'>
                  <div className='flex justify-center items-center' onClick={handleImageClick}>
                    {image ? (
                      <img
                        className='h-40 border border-red-600 mb-5 w-40 rounded-full  object-cover'
                        src={URL.createObjectURL(image)}
                        alt='avatar'
                      />
                    ) : (
                      <div className='max-w-sm px-4 py-10 mb-4  bg-gray-100 border-dashed border-2 border-gray-400 rounded-full items-center mx-auto text-center cursor-pointer'>
                        <label className='cursor-pointer'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8 text-gray-700 mx-auto mb-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                            />
                          </svg>
                          <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>Upload picture</h5>
                          <p className='font-normal text-sm text-gray-400 md:px-6'>
                            Choose photo size should be less than <b className='text-gray-600'>2mb</b>
                          </p>
                          <p className='font-normal text-sm text-gray-400 md:px-6'>
                            and should be in <b className='text-gray-600'>JPG, PNG</b> format.
                          </p>
                        </label>
                      </div>
                    )}
                  </div>

                  <input ref={inputRef} onChange={handleImageChange} type='file' className='hidden' accept='image/*' />
                  <div className='flex items-center justify-center'>
                    <div className='w-full'>
                      <label
                        onClick={handleUpload}
                        className='w-full transition-all duration-300 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer'
                      >
                        <button className='text-center ml-2'>Upload</button>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className='flex justify-end mt-5'>
              <button
                type='button'
                onClick={() => closeModalAvatar()}
                className='text-white bg-red-600 transition-all duration-300 hover:bg-red-700 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
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
