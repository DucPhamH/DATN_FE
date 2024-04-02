import { useContext, useEffect, useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AppContext } from '../../../../contexts/app.context'

export default function ThreeDotPost({ userID }) {
  const { profile } = useContext(AppContext)
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

      {isMenu && (
        <div className='z-10 absolute right-0 xl:right-[35%] bg-white divide-y divide-gray-100 text-sm rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
          <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
            <ul className='py-2 text-gray-700 dark:text-gray-200'>
              {profile._id === userID ? (
                <li>
                  <div className='flex cursor-pointer justify-between items-center  px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    Xóa bài viết
                  </div>
                </li>
              ) : (
                <li>
                  <span className='flex cursor-pointer justify-between items-center px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    Báo cáo
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
