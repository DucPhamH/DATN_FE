import SearchInput from './SearchInput'
import { IoMdNotifications } from 'react-icons/io'
import UserAvatar from './UserAvatar'
import { useLocation } from 'react-router-dom'
import Logo from '../Logo'

export default function Header() {
  const location = useLocation()

  return (
    <div className='flex pl-8 pr-4 py-3 w-full justify-between items-center transition-all duration-500 z-50 bg-white dark:bg-color-primary-dark shadow-sm dark:shadow-yellow-800 fixed'>
      {location.pathname === '/chef/create-blog' ||
      // tìm những url có chứa '/chef/edit-blog/'
      location.pathname.includes('/chef/edit-blog/') ? (
        <div className='hidden sm:block'>
          <Logo
            className='flex items-center gap-2.5 font-medium  mx-3'
            textClassName='text-xl flex font-bold whitespace-pre'
            sizeLogo={40}
          />
        </div>
      ) : (
        <div className=''></div>
      )}
      <div className=''></div>
      <div className='flex justify-between items-center'>
        <div className=''>
          <SearchInput />
        </div>
        <div className='flex justify-center items-center'>
          <div className='dark:bg-slate-600 dark:hover:bg-slate-500 dark:border-none text-2xl hover:bg-yellow-200 transition-all duration-300 cursor-pointer border text-red-600 dark:text-white shadow-md font-normal h-8 w-8 md:h-10 md:w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-1'>
            <IoMdNotifications />
          </div>
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}
