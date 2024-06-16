import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { SocketContext } from '../../../../contexts/socket.context'
import { omit } from 'lodash'
import useQueryConfig from '../../../../hooks/useQueryConfig'
import {
  checkReadNotification,
  deleteNotification,
  getListNotifications,
  readNotification
} from '../../../../apis/notificationApi'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import Loading from '../../Loading'
import { cutString } from '../../../../utils/helper'
import moment from 'moment'
import useravatar from '../../../../assets/images/useravatar.jpg'
import logo from '../../../../assets/images/logo.png'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function NotificationPopUp() {
  const [isMenu, setIsMenu] = useState(false)
  const { notification, setNotification } = useContext(SocketContext)
  const ref = useRef()
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenu(false)
    }
  }

  const { data: dataCheck } = useQuery({
    queryKey: ['check-notification'],
    queryFn: () => {
      return checkReadNotification()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (dataCheck?.data.result === true) {
      setNotification(true)
    }
    if (dataCheck?.data.result === false) {
      setNotification(false)
    }
  }, [dataCheck, setNotification])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const queryConfig = omit(useQueryConfig(), ['page', 'sort'])

  const fetchNotification = async ({ pageParam }) => {
    return await getListNotifications({ page: pageParam, ...queryConfig })
  }

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['notification', queryConfig],
    queryFn: fetchNotification,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.result.page + 1
      if (nextPage > lastPage.data.result.totalPage) return undefined
      return nextPage
    },
    enabled: isMenu
  })

  return (
    <div ref={ref}>
      <div
        onClick={() => setIsMenu(!isMenu)}
        className='dark:bg-slate-600 relative dark:hover:bg-slate-500 dark:border-none text-2xl hover:bg-yellow-200 transition-all duration-300 cursor-pointer border text-red-600 dark:text-white shadow-md font-normal h-8 w-8 md:h-10 md:w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-1'
      >
        <IoMdNotifications />
        {notification && <div className='absolute h-3 w-3 top-[-5px] right-0 rounded-full bg-red-500'></div>}
      </div>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-10%', transition: { duration: '0.1' } }}
            transition={{ type: 'spring', stiffness: '200', duration: '0.1' }}
            className='z-50 absolute top-[4rem] right-1 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-color-primary dark:divide-gray-600'
          >
            <div className='z-50  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-color-primary dark:divide-gray-600'>
              <div
                id='toast-notification'
                className=' w-[24rem] p-4 max-h-[35rem] overflow-y-auto scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300'
                role='alert'
              >
                <div className='flex items-center mb-3'>
                  <span className='mb-1 text-sm font-semibold text-gray-900 dark:text-white'>Thông báo mới</span>
                  <button
                    type='button'
                    onClick={() => setIsMenu(false)}
                    className='ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
                    data-dismiss-target='#toast-notification'
                    aria-label='Close'
                  >
                    <span className='sr-only'>Close</span>
                    <svg
                      className='w-3 h-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                  </button>
                </div>
                <div className='flex flex-col gap-1'>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {data?.pages?.map((dataNotifications) =>
                        dataNotifications.data.result.notifications.map((notification) => {
                          return (
                            <div className='' key={notification._id}>
                              <NotificationItem notification={notification} />
                            </div>
                          )
                        })
                      )}
                    </>
                  )}
                </div>
                <div className='w-full'>
                  <button
                    className='btn btn-xs text-xs w-full mt-4 hover:bg-red-800  bg-red-900 dark:bg-pink-700 dark:disabled:bg-slate-700 dark:disabled:text-gray-400 disabled:text-black disabled:bg-gray-100 text-gray-200'
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  >
                    {isFetchingNextPage
                      ? 'Đang tải ...'
                      : hasNextPage
                      ? 'Xem thêm kết quả khác'
                      : 'Không còn thông báo nào '}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// export enum NotificationTypes {
//   follow,
//   likePost,
//   commentPost,
//   commentChildPost,
//   sharePost,
//   likeRecipe,
//   commentRecipe,
//   bookmarkRecipe,
//   commentBlog,
//   bookmarkAlbum,
//   system
// }

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate()

  const checkNavigate = () => {
    if (notification.type === 0) {
      return navigate(`/user/${notification.link_id}`)
    }
    if (notification.type === 1 || notification.type === 2 || notification.type === 3 || notification.type === 4) {
      return navigate(`/post/${notification.link_id}`)
    }
    if (notification.type === 5 || notification.type === 6 || notification.type === 7) {
      return navigate(`/cooking/recipe/${notification.link_id}`)
    }
    if (notification.type === 8) {
      return navigate(`/blog/${notification.link_id}`)
    }
    if (notification.type === 9) {
      return navigate(`/album/${notification.link_id}`)
    }
    return
  }

  const readMutation = useMutation({
    mutationFn: () => readNotification(notification._id)
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteNotification(notification._id)
  })

  const handleDelete = () => {
    deleteMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['notification']
        })

        toast.success('Xóa thông báo thành công')
      }
    })
  }

  const handleRead = () => {
    if (notification.is_read) {
      return checkNavigate()
    }
    readMutation.mutate(null, {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['notification']
          }),
          queryClient.invalidateQueries({
            queryKey: ['check-notification']
          })
        ])
        checkNavigate()
      }
    })
  }

  if (notification.type === 10) {
    return (
      <div
        className={
          notification.is_read
            ? 'flex items-center relative cursor-pointer p-1 rounded-lg bg-white hover:bg-gray-200 transition-al dark:bg-gray-800'
            : 'flex items-center relative p-1 cursor-pointer  rounded-lg hover:bg-gray-200 transition-all dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-700'
        }
      >
        <div
          onClick={handleDelete}
          className='absolute top-0 right-0 m-1 text-xs font-bold text-gray-400 hover:text-gray-500'
        >
          Xóa
        </div>
        <div className='relative inline-block shrink-0'>
          <img className='w-12 h-12 object-cover rounded-full' src={logo} alt='image' />
          <span className='absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full'>
            <svg
              className='w-3 h-3 text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 18'
              fill='currentColor'
            >
              <path
                d='M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z'
                fill='currentColor'
              />
              <path
                d='M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z'
                fill='currentColor'
              />
            </svg>
          </span>
        </div>
        <div onClick={handleRead} className='ms-3 text-sm font-normal'>
          <div className='text-sm font-semibold text-gray-900 dark:text-white'>CookHealthy</div>
          <div className='text-xs font-normal'>{notification.content}</div>
          <span className='text-xs font-medium text-blue-600 dark:text-blue-300'>
            {moment(notification.createdAt).fromNow()}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        notification.is_read
          ? 'flex items-center relative cursor-pointer p-1 rounded-lg bg-white hover:bg-gray-200 transition-al dark:bg-gray-800'
          : 'flex items-center relative p-1 cursor-pointer  rounded-lg hover:bg-gray-200 transition-all dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-700'
      }
    >
      <div
        onClick={handleDelete}
        className='absolute top-0 right-0 m-1 text-xs font-bold text-gray-400 hover:text-gray-500'
      >
        Xóa
      </div>
      <div className='relative inline-block shrink-0'>
        <img
          className='w-12 h-12 object-cover rounded-full'
          src={notification.sender.avatar ? notification.sender.avatar : useravatar}
          alt='image'
        />
        <span className='absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full'>
          <svg
            className='w-3 h-3 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 18'
            fill='currentColor'
          >
            <path
              d='M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z'
              fill='currentColor'
            />
            <path
              d='M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z'
              fill='currentColor'
            />
          </svg>
        </span>
      </div>
      <div onClick={handleRead} className='ms-3 text-sm font-normal'>
        <div className='text-sm font-semibold text-gray-900 dark:text-white'>{notification.sender.name}</div>
        <div className='text-xs font-normal'>
          {notification.content}
          {notification.type === 0 ? '' : ':'}{' '}
          <span className='font-medium'>{cutString(notification.name_notification, 40)}</span>
        </div>
        <span className='text-xs font-medium text-blue-600 dark:text-blue-300'>
          {moment(notification.createdAt).fromNow()}
        </span>
      </div>
    </div>
  )
}
