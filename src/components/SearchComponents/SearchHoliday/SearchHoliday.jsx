import { useEffect, useRef, useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'

const search_food_item = [
  {
    id: 'buoi_sang',
    title: 'Buổi sáng'
  },
  {
    id: 'buoi_trua',
    title: 'Buổi trưa'
  },
  {
    id: 'buoi_toi',
    title: 'Buổi tối'
  },
  {
    id: 'le_hoi',
    title: 'Lễ hội'
  },
  {
    id: 'tet',
    title: 'Tết'
  },
  {
    id: 'sinh_nhat',
    title: 'Sinh nhật'
  },
  {
    id: 'giang_sinh',
    title: 'Giáng sinh'
  },
  {
    id: 'khac',
    title: 'Khác'
  }
]
export default function SearchHoliday() {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div
      className={`flex relative cursor-pointer text-teal-700 dark:text-gray-300 hover:text-black dark:hover:text-red-300 justify-between items-center px-2  lg:text-lg transition-colors duration-150 my-1 lg:m-2 rounded-lg`}
      ref={ref}
    >
      <div className='flex justify-center items-center' onClick={() => setOpen(!open)}>
        <div className='pr-1 text-sm font-medium lg:pr-2'>Dịp lễ</div>
        <div className='text-[8px] text-gray-500'>
          <BiSolidDownArrow />
        </div>
      </div>

      {open && (
        <div
          className='z-[999] border dark:border-gray-700 top-6 lg:top-10 right-[calc(-40%-10px)] max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100  lg:left-0 absolute
          transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-md shadow-md lg:w-[20rem] w-36'
        >
          <div className='py-2 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-2 text-sm  text-gray-700'>
            {search_food_item.map((item) => {
              return (
                <div key={item.id} className='flex justify-center items-center'>
                  <input type='checkbox' id={item.id} className='checkbox checkbox-success' />
                  <label htmlFor={item.id} className='ms-2 text-sm w-20 font-medium text-gray-900 dark:text-gray-300'>
                    {item.title}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
