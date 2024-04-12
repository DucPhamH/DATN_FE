import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import useravatar from '../../../../assets/images/useravatar.jpg'
export default function UserAvatarLanding({ navBar }) {
  const [isMenu, setIsMenu] = useState(false)
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
    <div ref={ref}>
      <button
        className={`flex relative items-center transition-all duration-700 text-lg py-1 px-2 font-medium text-gray-900 rounded-full  ${
          navBar ? '' : 'bg-white/60 dark:bg-transparent'
        } hover:text-red-600 dark:hover:text-red-600 md:mr-0  dark:text-white`}
        type='button'
        onClick={() => setIsMenu(!isMenu)}
      >
        <img className='w-8 h-8 md:mr-2 border border-red-200 rounded-full' src={useravatar} alt='user photo' />
        <span className='hidden md:block'>User name</span>

        <svg
          className='hidden md:block w-3 h-3 ml-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m1 1 4 4 4-4' />
        </svg>
      </button>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-10%', transition: { duration: '0.2' } }}
            transition={{ type: 'spring', stiffness: '200', duration: '0.5' }}
            className='z-50 absolute top-16 right-6 md:top-20 md:right-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-color-primary dark:divide-gray-600'
          >
            <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-color-primary dark:divide-gray-600'>
              <div className='px-4 py-3 text-gray-900 dark:text-white'>
                <div className='font-medium '>User name</div>
                <div className='truncate'>name@gmail.com</div>
              </div>
              <ul className='py-2 text-gray-700 dark:text-gray-200'>
                <li>
                  <Link
                    to='/home'
                    className='block px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Thông tin
                  </Link>
                </li>
              </ul>
              <div className='py-2 '>
                <a
                  href='#'
                  className='flex justify-between items-center px-4 py-2 text-sm transition-all duration-400 text-gray-700 dark:hover:text-white hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                >
                  Đăng xuất
                  <div className='text-base'>
                    <HiOutlineLogout />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
