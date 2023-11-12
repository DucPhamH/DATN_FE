import FoodCard from '../../components/CardComponents/FoodCard/FoodCard'
import SearchCard from '../../components/CardComponents/SearchCard/SearchCard'
import { BiFilter } from 'react-icons/bi'
import { AiOutlineCamera } from 'react-icons/ai'
import { MdNightlight } from 'react-icons/md'
import { PiClockAfternoonFill } from 'react-icons/pi'
import { BsFillSunFill } from 'react-icons/bs'
import { FaCloudSun } from 'react-icons/fa'

const foodItems = [
  {
    id: 1,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 2,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 3,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 4,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 5,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 6,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 7,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 8,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  }
]

const searchItems = [
  {
    id: 1,
    title: 'Món ăn',
    color: 'text-orange-600'
  },
  {
    id: 2,
    title: 'Vùng miền',
    color: 'text-green-700'
  },
  {
    id: 3,
    title: 'Cách nấu',
    color: 'text-blue-500'
  },
  {
    id: 4,
    title: 'Dịp lễ',
    color: 'text-teal-600'
  },
  {
    id: 5,
    title: 'Khác',
    color: 'text-pink-500'
  }
]

const checkTime = () => {
  var day = new Date()
  var hr = day.getHours()
  if (hr >= 0 && hr < 12) {
    return (
      <div className='flex gap-3 items-center mb-1'>
        Chào buổi sáng, Đức
        <FaCloudSun />
      </div>
    )
  } else if (hr == 12) {
    return (
      <div className='flex gap-3 items-center mb-1'>
        Chào buổi trưa, Đức
        <BsFillSunFill />
      </div>
    )
  } else if (hr >= 12 && hr <= 17) {
    return (
      <div className='flex gap-3 items-center mb-1'>
        Chào buổi chiều, Đức
        <PiClockAfternoonFill />
      </div>
    )
  } else {
    return (
      <div className='flex gap-3 items-center mb-1'>
        Chào buổi tối, Đức
        <MdNightlight />
      </div>
    )
  }
}

export default function Cooking() {
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      <h2 className='text-xl font-semibold mx-3 text-red-700 dark:text-gray-300'>{checkTime()}</h2>
      <div className='flex flex-wrap justify-between items-center border bg-white shadow-sm dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-xl py-1 px-3 mt-10 mb-4 mx-3'>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {searchItems.map((searchItem) => {
            return <SearchCard key={searchItem.id} searchItem={searchItem} />
          })}
        </div>

        <div className='flex gap-3 w-full justify-end lg:w-auto text-2xl'>
          <div className='hover:text-red-400 cursor-pointer'>
            <AiOutlineCamera />
          </div>
          <div className='hover:text-red-400 cursor-pointer'>
            <BiFilter />
          </div>
        </div>
      </div>
      <div className='flex mx-3 justify-end '>
        <div className='flex gap-5 justify-center items-center'>
          <div className=' font-medium text-gray-700 dark:text-gray-400'>Page 1/10</div>
          <div className='flex'>
            <button className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 5H1m0 0 4 4M1 5l4-4'
                />
              </svg>
            </button>
            <button className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='grid gap-3 md:gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5 mx-2'>
          {foodItems.map((foodItem) => {
            return <FoodCard key={foodItem.id} foodItem={foodItem} />
          })}
        </div>
      </div>
    </div>
  )
}
