import { useRef, useState } from 'react'

import toast from 'react-hot-toast'

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
    console.log(formData)
    toast.success('upload avatar thành công')
    //ghep api o day
  }
  return (
    <div className='modal-customs'>
      <div className='overlay-customs' onClick={() => closeModalAvatar()}></div>
      <div className='modal-content min-w-[360px] md:min-w-[400px] dark:bg-gray-900 bg-[#f7f1db]'>
        <div className='relative w-full max-w-md max-h-full'>
          <div className='px-2 text-center '>
            <h3 className='mb-6 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Chọn ảnh đại diện</h3>
            <section className='w-full mx-auto items-center '>
              <div className='max-w-sm mx-auto dark:bg-slate-950 bg-white rounded-lg shadow-md overflow-hidden items-center'>
                <div className='px-4  py-6'>
                  <div className='flex justify-center items-center' onClick={handleImageClick}>
                    {image ? (
                      <img
                        className='h-[16rem] w-[16rem] border border-red-600 mb-5 rounded-full object-contain'
                        src={URL.createObjectURL(image)}
                        alt='avatar'
                      />
                    ) : (
                      <div className='max-w-sm h-[16rem] w-[16rem] flex justify-center mb-4 dark:bg-slate-950  bg-gray-100 border-dashed border-2 border-gray-400 rounded-full items-center mx-auto text-center cursor-pointer'>
                        <label id='images' className='cursor-pointer'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8 text-gray-700 dark:text-white mx-auto mb-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                            />
                          </svg>
                          <h5 className='mb-2 text-xl font-bold tracking-tight dark:text-white text-gray-700'>
                            Upload picture
                          </h5>
                          <p className='font-normal text-sm dark:text-white text-gray-400 md:px-6'>
                            Chọn 1 ảnh theo định dạng <b className='dark:text-white text-gray-600'>JPG, PNG</b>.
                          </p>
                        </label>
                      </div>
                    )}
                  </div>

                  <input
                    id='images'
                    ref={inputRef}
                    onChange={handleImageChange}
                    type='file'
                    className='hidden'
                    accept='image/*'
                  />
                  <div className='flex items-center justify-center'>
                    <div className='w-full'>
                      <div
                        onClick={handleUpload}
                        className='w-full transition-all duration-300 text-white bg-red-600 dark:bg-pink-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer'
                      >
                        <button className='text-center ml-2'>Tải lên</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className='flex justify-end mt-5'>
              <button
                type='button'
                onClick={() => closeModalAvatar()}
                className='text-white bg-red-600 dark:bg-pink-700 transition-all duration-300 hover:bg-red-700 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
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
