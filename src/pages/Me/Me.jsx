import { BiSolidPencil } from 'react-icons/bi'
import { BsFillCameraFill } from 'react-icons/bs'
import useravatar from '../../assets/images/useravatar.jpg'
import avatarbg from '../../assets/images/avatarbg.jpg'
import { useState } from 'react'
import { currentAccount } from '../../apis/userApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import MePost from './components/MePost'
import TabsProfile from '../../components/GlobalComponents/TabsProfile'
import ModalUploadAvatar from './components/ModalUploadAvatar'
import ModalUploadCoverAvatar from './components/ModalUploadCoverAvatar'
import ThreeDots from './components/ThreeDots'
import ModalUpdateProfile from './components/ModalUpdateProfile'
import { navBarsProfileChef, navBarsProfileUser } from '../../constants/objectUi'
import MeBlog from './components/MeBlog'
import MeAlbum from './components/MeAlbum'
import MeRecipe from './components/MeRecipe'
import { FaCheckCircle } from 'react-icons/fa'

export default function Me() {
  const [modalAvatar, setModalAvatar] = useState(false)
  const [modalCoverAvatar, setModalCoverAvatar] = useState(false)
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false)
  const [toggleState, setToggleState] = useState(0)

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const getActiveClass = (index, className) => (toggleState === index ? className : '')
  const openModalAvatar = () => {
    setModalAvatar(true)
  }

  const closeModalAvatar = () => {
    setModalAvatar(false)
  }

  const openModalCoverAvatar = () => {
    setModalCoverAvatar(true)
  }

  const closeModalCoverAvatar = () => {
    setModalCoverAvatar(false)
  }

  const openModalUpdateProfile = () => {
    setModalUpdateProfile(true)
  }

  const closeModalUpdateProfile = () => {
    setModalUpdateProfile(false)
  }
  const { data: userData } = useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return currentAccount()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
  console.log(userData?.data.result[0])

  return (
    <div>
      <div className='h-full rounded-lg text-gray-900 dark:text-white'>
        <div className='w-full'>
          <div className='w-full h-[18rem]'>
            <div className='relative'>
              <img
                alt='avatar bg'
                src={userData?.data.result[0].cover_avatar ? userData?.data.result[0].cover_avatar : avatarbg}
                className='w-full shadow-md rounded-lg h-[18rem] relative object-cover'
              />
              <div
                className='absolute top-2 left-2 text-3xl cursor-pointer text-gray-600 hover:text-gray-700 dark:text-red-900 dark:hover:text-red-950'
                onClick={openModalCoverAvatar}
              >
                <BsFillCameraFill />
              </div>
              <div className='px-2 w-full md:flex md:flex-row gap-2 top-60 pb-5 absolute'>
                <img
                  className='h-40 w-40 ml-2 border border-red-200 rounded-full  object-cover relative'
                  src={userData?.data.result[0].avatar ? userData?.data.result[0].avatar : useravatar}
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
                      <div className='text-3xl flex items-center gap-2 whitespace-nowrap text-gray-800 dark:text-white font-semibold'>
                        {userData?.data.result[0].name}
                        {userData?.data.result[0].role === 1 && (
                          <div className='text-blue-400 rounded-full flex justify-center items-center '>
                            <FaCheckCircle size={20} />
                          </div>
                        )}
                      </div>

                      <div className='text-lg whitespace-nowrap text-gray-600 dark:text-gray-400'>
                        @{userData?.data.result[0].user_name}
                      </div>
                      {userData?.data.result[0].role === 0 && (
                        <>
                          {userData?.data.result[0].followers_count >= 3 ? (
                            <div>
                              {userData?.data.result[0].upgrade_request?.type === 0 ? (
                                <span className='text-sm font-semibold'>
                                  Lưu ý: Bạn đã gửi yêu cầu nâng cấp lên đầu bếp, vui lòng chờ xác nhận từ admin !
                                </span>
                              ) : (
                                <span className='text-sm font-semibold'>
                                  Lưu ý: Bạn đã đạt đủ điều kiện để nâng cấp lên đầu bếp, hãy nâng cấp ngay !
                                </span>
                              )}
                            </div>
                          ) : (
                            <div>
                              {userData?.data.result[0].upgrade_request?.type === 1 && (
                                <span className='text-sm font-semibold'>
                                  Lưu ý: Bạn đã gửi yêu cầu nâng cấp lên đầu bếp, vui lòng chờ xác nhận từ admin !
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className='py-2 flex divide-x divide-gray-400 divide-solid'>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>{userData?.data.result[0].followers_count}</span>
                        <span className='text-gray-600 dark:text-white'> Người theo dõi</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>{userData?.data.result[0].posts_count}</span>
                        <span className='text-gray-600 dark:text-white'> Bài đăng</span>
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <button
                      type='button'
                      onClick={openModalUpdateProfile}
                      className='rounded-lg btn-sm btn flex items-center justify-center hover:bg-red-600 bg-red-700 text-sm text-white font-medium transition-all duration-300 ease-in-out '
                    >
                      <BiSolidPencil className='' />
                      Chỉnh sửa thông tin
                    </button>
                    <div className='px-3 text-2xl hover:text-red-600 cursor-pointer transition-all duration-300'>
                      <ThreeDots user={userData?.data.result[0]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[20rem] md:mt-64 lg:mt-48 dark:shadow-sm shadow-md dark:shadow-red-600 py-3 px-4'>
          {/* <NavBarProfile /> */}
          <TabsProfile
            toggleTab={toggleTab}
            getActiveClass={getActiveClass}
            navBarsProfile={userData?.data.result[0].role === 0 ? navBarsProfileUser : navBarsProfileChef}
          />
        </div>
        {userData?.data.result[0].role === 0 ? (
          <>{toggleState === 0 && <MePost user={userData?.data.result[0]} />}</>
        ) : (
          <>
            {toggleState === 0 && <MePost user={userData?.data.result[0]} />}
            {toggleState === 1 && <MeRecipe />}
            {toggleState === 2 && <MeAlbum />}
            {toggleState === 3 && <MeBlog />}
          </>
        )}
      </div>
      {modalAvatar && <ModalUploadAvatar closeModalAvatar={closeModalAvatar} />}
      {modalCoverAvatar && <ModalUploadCoverAvatar closeModalCoverAvatar={closeModalCoverAvatar} />}
      {modalUpdateProfile && (
        <ModalUpdateProfile handleCloseModalUpdateProfile={closeModalUpdateProfile} user={userData?.data.result[0]} />
      )}
    </div>
  )
}
