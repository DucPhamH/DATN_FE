import { BiSolidDownArrow } from 'react-icons/bi'
export default function SearchCard({ searchItem }) {
  return (
    <div
      className={`flex cursor-pointer ${searchItem.color} dark:text-gray-300 hover:text-black dark:hover:text-red-300 justify-between items-center px-2  lg:text-lg transition-colors duration-150 my-1 lg:m-2 rounded-lg`}
    >
      <div className='pr-1 lg:pr-3'>{searchItem.title}</div>
      <div className='text-[8px] text-gray-500'>
        <BiSolidDownArrow />
      </div>
    </div>
  )
}
