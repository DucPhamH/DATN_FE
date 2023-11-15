import { useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
export default function SearchCard({ searchItem }) {
  const [open, setOpen] = useState(false)
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div
      className={`flex relative cursor-pointer ${searchItem.color} dark:text-gray-300 hover:text-black dark:hover:text-red-300 justify-between items-center px-2  lg:text-lg transition-colors duration-150 my-1 lg:m-2 rounded-lg`}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      <div className='pr-1 lg:pr-3'>{searchItem.title}</div>
      <div className='text-[8px] text-gray-500'>
        <BiSolidDownArrow />
      </div>
      {open && (
        <div
          className='z-[999] border dark:border-gray-700 top-6 lg:top-7 right-[calc(-50%-10px)] max-h-64 overflow-y-auto  lg:left-0 absolute
          transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-md shadow-md w-44'
        >
          <ul className='py-2 text-sm text-gray-700'>
            {searchItem.radio_search.map((item) => {
              return (
                <li key={item.id}>
                  <div className='flex items-center px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-700'>
                    <input
                      type='radio'
                      id={item.id}
                      defaultValue
                      name='default-radio'
                      className='w-4 h-4 bg-gray-100 border-gray-300'
                    />
                    <label htmlFor={item.id} className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      {item.title}
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
