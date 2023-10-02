import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { SlUserFollow } from 'react-icons/sl'
import { BsChatLeftDots } from 'react-icons/bs'
export default function ThreeDots() {
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
            exit={{ opacity: 0, y: '-10%', transition: { duration: '0.05' } }}
            transition={{ type: 'spring', stiffness: '100', duration: '0.05' }}
            className='z-50 absolute top-48 right-0 md:top-56 xl:top-48 bg-white divide-y divide-gray-100 text-sm rounded-lg shadow w-36 dark:bg-color-primary dark:divide-gray-600'
          >
            <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-color-primary dark:divide-gray-600'>
              <ul className='py-2 text-gray-700 dark:text-gray-200'>
                <li>
                  <span className='flex justify-between items-center px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    Theo dõi
                    <SlUserFollow />
                  </span>
                </li>
                <li>
                  <Link
                    to='/me'
                    className='flex justify-between items-center  px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Nhắn tin
                    <BsChatLeftDots />
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
