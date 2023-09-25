import { useContext, useEffect, useState } from 'react'
import { navBars } from '../../../services/objectUi'
import ButtonLanding from '../ButtonLanding'
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { AppContext } from '../../../contexts/app.context'
import UserAvatarLanding from '../UserAvatarLanding'

export default function HeaderLanding() {
  const [navBar, setNavBar] = useState(false)
  // const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  // console.log(theme)
  const { theme, setTheme } = useContext(AppContext)
  // const options = [
  //   {
  //     icon: <BsFillSunFill />,
  //     text: 'light'
  //   },
  //   {
  //     icon: <BsFillMoonStarsFill />,
  //     text: 'dark'
  //   }
  // ]
  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setTheme('dark')
  //   } else {
  //     setTheme('light')
  //   }
  // }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

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
      className={`flex justify-between px-8 pt-8 py-5 w-full transition-all duration-700 fixed z-30
          ${navBar ? 'bg-white/90 dark:bg-[#1c1821]/90 backdrop-filter shadow-lg' : ''}`}
    >
      <h4 className='dark:text-white text-gray-900 flex items-center font-black cursor-pointer text-3xl'>
        <span className='text-red-500'>Cook</span>Healthy
        <div className='flex justify-center items-center'>
          {theme === 'dark' ? (
            <div
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
              className={'flex justify-center px-2 hover:text-blue-300 cursor-pointer items-center text-white'}
            >
              <BsFillMoonStarsFill />
            </div>
          ) : (
            <div
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
              className={'flex justify-center px-2 hover:text-red-400 cursor-pointer items-center text-red-500'}
            >
              <BsFillSunFill />
            </div>
          )}
        </div>
      </h4>

      {/* <div className='flex'>
        {options?.map((opt) => (
          <div
            onClick={() => setTheme(opt.text)}
            className={`flex justify-center px-2 hover:text-blue-400 items-center ${
              theme === opt.text && 'text-blue-400'
            }`}
            key={opt.text}
          >
            {opt.icon}
          </div>
        ))}
      </div> */}

      <ul className='navbar-links flex justify-end items-center ml-64'>
        <li className='inline-block list-none'>
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
      <div>
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
      </div>
      {/* <UserAvatarLanding navBar={navBar} /> */}
    </nav>
  )
}
