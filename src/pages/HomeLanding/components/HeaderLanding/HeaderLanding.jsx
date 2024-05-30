import { useEffect, useState } from 'react'
import ButtonLanding from '../ButtonLanding'
import DarkMode from '../../../../components/GlobalComponents/DarkMode'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { navBars } from '../../../../constants/objectUi'

export default function HeaderLanding() {
  const [navBar, setNavBar] = useState(false)
  const [activeMenu, setActiveMenu] = useState(false)

  let isTabletMid = useMediaQuery({ query: '(min-width: 1023px)' })

  useEffect(() => {
    if (isTabletMid) {
      setActiveMenu(false)
    }
  }, [isTabletMid])

  const handleActiveMenu = () => {
    setActiveMenu(true)
  }

  const handleCloseMenu = () => {
    setActiveMenu(false)
  }

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavBar(true)
    } else {
      setNavBar(false)
    }
  }
  window.addEventListener('scroll', changeBackground)
  return (
    <nav
      className={`flex justify-between px-3 items-center py-4 md:px-8 md:pt-8 w-full transition-all duration-300 fixed z-30
          ${navBar ? 'bg-white/90 dark:bg-[#1c1821]/90 backdrop-filter shadow-lg' : ''}`}
    >
      <div
        onClick={handleActiveMenu}
        className='lg:hidden cursor-pointer hover:text-red-700 relative p-2 flex justify-center items-center z-30 focus:outline-none transform active:scale-75 transition-transform'
      >
        <AiOutlineMenu className='text-2xl' />
      </div>
      {activeMenu && (
        <div className='w-full absolute h-screen top-0 right-0 z-[999] dark:bg-black/95 bg-white/95'>
          <div className='w-full relative'>
            <ul className='navbar-links pt-24 flex flex-col justify-center items-center '>
              {navBars.map((nav) => {
                return (
                  <li key={nav.id} onClick={handleCloseMenu} className='my-8 list-none mx-3'>
                    <a
                      className='text-gray-900 dark:text-white font-medium text-xl no-underline tracking-wide cursor-pointer dark:hover:bg-gradient-to-r dark:from-[#ef571a] dark:to-[#b11804] hover:bg-gradient-to-r from-[#a5c233] to-[#2f8c07] hover:text-white hover:px-5 hover:py-3 hover:text-xl'
                      href={nav.path}
                    >
                      {nav.name}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div
              onClick={handleCloseMenu}
              className='absolute right-3 rounded-full transition-all duration-300 bg-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 flex justify-center items-center  top-5 h-8 w-8  dark:text-yellow-400 font-extrabold dark:bg-gray-700'
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
      )}

      <h4 className='dark:text-white text-gray-900 flex justify-center items-center font-black cursor-pointer text-2xl md:text-3xl'>
        <span className='text-red-500'>Cook</span>Healthy
        <DarkMode />
      </h4>

      <ul className='navbar-links hidden lg:flex lg:justify-center lg:items-center lg:ml-64'>
        <li className='list-none'>
          {navBars.map((nav) => {
            return (
              <a
                key={nav.id}
                className='text-gray-900 dark:text-white mr-12 ml-1 list-none my-2 font-medium text-xl  no-underline tracking-wide cursor-pointer dark:hover:bg-gradient-to-r dark:from-[#ef571a] dark:to-[#b11804] hover:bg-gradient-to-r from-[#a5c233] to-[#2f8c07] hover:text-white hover:px-3 hover:py-2 hover:text-xl'
                href={nav.path}
              >
                {nav.name}
              </a>
            )
          })}
        </li>
      </ul>
      <div>
        <ButtonLanding
          link={'/login'}
          className='bg-gradient-to-r md:text-base text-xs inline-block text-gray-300 hover:text-white from-[#ef571a] to-[#b11804]'
          text='Đăng nhập'
        />
        <ButtonLanding
          link={'/register'}
          className={`border hidden md:inline-block text-gray-900 dark:text-gray-300 dark:hover:text-white hover:text-red-700 border-orange-400
          ${navBar ? '' : 'bg-white/60 dark:bg-transparent'}`}
          text='Đăng kí'
        />
      </div>
      {/* <UserAvatarLanding navBar={navBar} /> */}
    </nav>
  )
}
