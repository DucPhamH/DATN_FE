import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import ModalChangePass from '../ModalChangePass'
import ModalRequest from '../ModalRequest'
import { updateRequest } from '../../../../apis/userApi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '../../../../main'
export default function ThreeDots({ user }) {
  const [isMenu, setIsMenu] = useState(false)
  const [openModalChangePass, setOpenModalChangePass] = useState(false)
  const [openModalRequest, setOpenModalRequest] = useState(false)

  const handleOpenModalChangePass = () => {
    setOpenModalChangePass(true)
  }

  const handleCloseModalChangePass = () => {
    setOpenModalChangePass(false)
  }
  const updateRequestMutation = useMutation({
    mutationFn: (body) => updateRequest(body)
  })

  const handleOpenModalRequest = () => {
    if (user?.followers_count >= 3) {
      updateRequestMutation.mutate(
        {},
        {
          onSuccess: (data) => {
            console.log(data)
            toast.success('Yêu cầu nâng cấp lên đầu bếp thành công, hãy đợi email phản hồi từ chúng tôi')
            queryClient.invalidateQueries('me')
            setIsMenu(false)
          },
          onError: (error) => {
            console.log(error)
            toast.error('Yêu cầu nâng cấp tài khoản thất bại')
          }
        }
      )
      return
    }
    setOpenModalRequest(true)
  }

  const handleCloseModalRequest = () => {
    setOpenModalRequest(false)
  }

  const ref = useRef()
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenu(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div ref={ref}>
        <button
          className='flex relative items-center transition-all duration-700 text-2xl py-1 px-2 font-medium text-gray-900 rounded-full
         hover:text-red-600 dark:hover:text-red-600 md:mr-0  dark:text-white'
          type='button'
          onClick={() => setIsMenu(!isMenu)}
        >
          <BiDotsHorizontalRounded />
        </button>
        <AnimatePresence>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: '-10%' }}
              animate={{ opacity: 1, y: '0%' }}
              exit={{ opacity: 0, y: '-10%', transition: { duration: '0.025' } }}
              transition={{ type: 'spring', stiffness: '100', duration: '0.025' }}
              className='z-50 absolute right-2 bg-white divide-y divide-gray-100 text-sm rounded-lg shadow w-36 dark:bg-color-primary dark:divide-gray-600'
            >
              <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-color-primary dark:divide-gray-600'>
                <ul className='py-2 text-gray-700 dark:text-gray-200'>
                  <li onClick={handleOpenModalChangePass}>
                    <span className='flex font-medium text-sm justify-between items-center px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Đổi mật khẩu
                    </span>
                  </li>
                  {user?.role === 1 ? null : (
                    <li onClick={handleOpenModalRequest}>
                      <span className='flex font-medium text-sm justify-between items-center  px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        Nâng cấp tài khoản
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {openModalChangePass && <ModalChangePass handleCloseModalUpdatePass={handleCloseModalChangePass} />}
      {openModalRequest && (
        <ModalRequest handleCloseModalRequest={handleCloseModalRequest} updateRequest={updateRequestMutation} />
      )}
    </>
  )
}
