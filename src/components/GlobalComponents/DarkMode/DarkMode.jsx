import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../contexts/app.context'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'

export default function DarkMode() {
  const { theme, setTheme } = useContext(AppContext)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])
  return (
    <div className='flex justify-center items-center'>
      {theme === 'dark' ? (
        <div
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          className={'flex text-xl justify-center px-2 hover:text-blue-300 cursor-pointer items-center text-white'}
        >
          <BsFillMoonStarsFill />
        </div>
      ) : (
        <div
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          className={'flex text-xl justify-center px-2 hover:text-red-400 cursor-pointer items-center text-red-500'}
        >
          <BsFillSunFill />
        </div>
      )}
    </div>
  )
}
