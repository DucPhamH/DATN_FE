import SearchInput from './SearchInput'
import UserAvatar from './UserAvatar'
import { useLocation } from 'react-router-dom'
import Logo from '../Logo'
import NotificationPopUp from './NotificationPopUp'

export default function Header() {
  const location = useLocation()

  return (
    <div className='flex pl-8 pr-4 py-3 w-full justify-between items-center transition-all duration-500 z-50 bg-white dark:bg-color-primary-dark shadow-sm dark:shadow-yellow-800 fixed'>
      {location.pathname === '/chef/create-blog' ||
      location.pathname === '/chef/create-recipe' ||
      location.pathname === '/chef/create-album' ||
      location.pathname.includes('/chef/edit-blog/') ||
      location.pathname.includes('/chef/edit-recipe/') ||
      location.pathname.includes('/chef/edit-album/') ? (
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
          <NotificationPopUp />
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}
