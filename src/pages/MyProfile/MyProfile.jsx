import { BiSolidPencil } from 'react-icons/bi'
import ThreeDots from '../../components/ProfileComponents/ThreeDots'
import NavBarProfile from '../../components/ProfileComponents/NavBarProfile'
import { Outlet } from 'react-router-dom'
import { BsFillCameraFill } from 'react-icons/bs'
import useravatar from '../../assets/images/useravatar.jpg'
import avatarbg from '../../assets/images/avatarbg.jpg'
import { useState } from 'react'
import ModalUploadAvatar from '../../components/ProfileComponents/ModalUploadAvatar'

export default function MyProfile() {
  const [modalAvatar, setModalAvatar] = useState(false)

  const openModalAvatar = () => {
    setModalAvatar(true)
  }

  const closeModalAvatar = () => {
    setModalAvatar(false)
  }
  return (
    <div>
      <div className='h-full dark:bg-slate-900 bg-gray-50 text-gray-900 dark:text-white justify-center mx-3'>
        <div className='w-full'>
          <div className='w-full h-[18rem]'>
            <div className='relative'>
              <img
                alt='avatar bg'
                src={avatarbg}
                className='w-full shadow-md rounded-lg h-[18rem] relative object-cover'
              />
              <div className='absolute top-2 left-2 text-3xl cursor-pointer text-gray-600 hover:text-gray-700 dark:text-red-900 dark:hover:text-red-950'>
                <BsFillCameraFill />
              </div>
              <div className='w-full md:flex md:flex-row gap-2 top-60 border-b-2 border-red-500 pb-5 absolute'>
                <img
                  className='h-40 w-40 ml-2 border border-red-200 rounded-full  object-cover relative'
                  src={useravatar}
                  alt='avatar'
                />
                <div
                  onClick={openModalAvatar}
                  className='absolute top-28 left-32 p-2 bg-gray-300 rounded-full text-2xl cursor-pointer text-gray-600 hover:text-gray-700 dark:text-red-900 dark:hover:text-red-950'
                >
                  <BsFillCameraFill />
                </div>
                <div className='w-full lg:flex mr-10 mb-8 items-end justify-between '>
                  <div className='md:mt-16 flex-col flex justify-end'>
                    <div className='px-2'>
                      <div className='text-3xl whitespace-nowrap text-gray-800 dark:text-white font-semibold'>
                        UserName
                      </div>
                      <div className='text-lg whitespace-nowrap text-gray-600 dark:text-gray-400'>@UserName</div>
                    </div>

                    <div className='py-4 flex divide-x divide-gray-400 divide-solid'>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>56</span>
                        <span className='text-gray-600 dark:text-white'> followers</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>112</span>
                        <span className='text-gray-600 dark:text-white'> following</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>27</span>
                        <span className='text-gray-600 dark:text-white'> repos</span>
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <button
                      type='button'
                      className='rounded-lg flex mx-2 items-center justify-center hover:bg-red-600 bg-red-700 text-sm text-white py-2 px-3 font-medium  transition-all duration-300 ease-in-out '
                    >
                      <BiSolidPencil className='mr-2' />
                      Chỉnh sửa thông tin cá nhân
                    </button>
                    <div className='px-3 text-2xl hover:text-red-600 cursor-pointer transition-all duration-300'>
                      <ThreeDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[20rem] md:mt-64 lg:mt-52 shadow-md dark:shadow-gray-950 py-3 px-4'>
          <NavBarProfile />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      {modalAvatar && <ModalUploadAvatar closeModalAvatar={closeModalAvatar} />}
    </div>
  )
}
