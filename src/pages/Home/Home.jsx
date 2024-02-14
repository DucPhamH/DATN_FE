import { BsFillImageFill, BsFillSunFill } from 'react-icons/bs'
import useravatar from '../../assets/images/useravatar.jpg'
import { MdNightlight } from 'react-icons/md'
import { FaCloudSun } from 'react-icons/fa'
import { PiClockAfternoonFill } from 'react-icons/pi'
const checkTime = () => {
  var day = new Date()
  var hr = day.getHours()
  if (hr >= 0 && hr < 12) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            Chào buổi sáng, Đức
            <FaCloudSun />
          </div>
        </h2>
      </>
    )
  } else if (hr == 12) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center '>
            Chào buổi trưa, Đức
            <BsFillSunFill />
          </div>
        </h2>
      </>
    )
  } else if (hr >= 12 && hr <= 17) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            Chào buổi chiều, Đức
            <PiClockAfternoonFill />
          </div>
        </h2>
      </>
    )
  } else {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            Chào buổi tối, Đức
            <MdNightlight />
          </div>
        </h2>
      </>
    )
  }
}
export default function Home() {
  return (
    <div className=' grid xl:mx-10 xl:gap-12 xl:grid-cols-5'>
      <div className=' mt-2 bg-white dark:bg-color-primary dark:shadow-sm dark:shadow-red-300 dark: rounded-lg col-span-3 px-4'>
        <div>{checkTime()}</div>
        <div className='flex justify-between items-center gap-2 md:gap-4 w-full'>
          <div className='w-8 h-8 md:w-10 overflow-hidden md:h-10 rounded-full cursor-pointer'>
            <img
              className='w-8 h-8 md:w-10 object-cover border border-red-200 md:h-10 rounded-full'
              src={useravatar}
              alt='user photo'
            />
          </div>
          <div className='bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-900 w-full cursor-pointer hover:bg-slate-200 transition-all h-12 my-4 flex items-center rounded-full'>
            <span className='mx-4 text-gray-500 dark:text-gray-400'>Bạn đang nghĩ gì ?</span>
          </div>
        </div>
        <div className='border mb-4 dark:border-gray-700 border-red-200 '></div>
        <div className='flex mb-2 justify-between'>
          <div className='flex mx-1'>
            <BsFillImageFill className='text-2xl text-red-700 cursor-pointer' />
          </div>
          <button className='btn-sm bg-red-700 hover:bg-red-800  text-sm text-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out'>
            Đăng bài viết
          </button>
        </div>
      </div>
    </div>
  )
}
