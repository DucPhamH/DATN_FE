import { useState } from 'react'
import { navBars } from '../../../services/objectUi'
import ButtonLanding from '../ButtonLanding'
import UserAvatarLanding from '../UserAvatarLanding'
import DarkMode from '../../GlobalComponents/DarkMode'
import { AiOutlineMenu } from 'react-icons/ai'

export default function HeaderLanding() {
  const [navBar, setNavBar] = useState(false)
  // const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  // console.log(theme)

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
      className={`flex justify-between px-3 items-center py-4 md:px-8 md:pt-8 md:py-5 w-full transition-all duration-500 fixed z-30
          ${navBar ? 'bg-white/90 dark:bg-[#1c1821]/90 backdrop-filter shadow-lg' : ''}`}
    >
      <div
        // onClick={handleActiveMenu}
        className='lg:hidden relative p-2 flex justify-center items-center z-30 focus:outline-none transform active:scale-75 transition-transform'
      >
        <AiOutlineMenu className='text-2xl' />
      </div>

      <h4 className='dark:text-white text-gray-900 flex justify-center items-center font-black cursor-pointer text-2xl md:text-3xl'>
        <span className='text-red-500'>Cook</span>Healthy
        <DarkMode />
      </h4>

      <ul className='navbar-links hidden lg:flex lg:justify-center lg:items-center lg:ml-64'>
        <li className='list-none '>
          {navBars.map((nav) => {
            return (
              <a
                key={nav.id}
                className='text-gray-900 dark:text-white font-medium text-lg mr-16 my-2 no-underline tracking-wide cursor-pointer dark:hover:bg-gradient-to-r dark:from-[#ef571a] dark:to-[#b11804] hover:bg-gradient-to-r from-[#a5c233] to-[#2f8c07] hover:text-white hover:px-5 hover:py-3 hover:text-xl'
                href={nav.path}
              >
                {nav.name}
              </a>
            )
          })}
        </li>
      </ul>
      {/* <div>
        <ButtonLanding
          link={'/login'}
          className='bg-gradient-to-r text-gray-300 hover:text-white from-[#ef571a] to-[#b11804]'
          text='Đăng nhập'
        />
        <ButtonLanding
          link={'/register'}
          className={`border text-gray-900 dark:text-gray-300 dark:hover:text-white hover:text-red-700 border-orange-400
          ${navBar ? '' : 'bg-white/60 dark:bg-transparent'}`}
          text='Đăng kí'
        />
      </div> */}
      <UserAvatarLanding navBar={navBar} />
    </nav>
  )
}
