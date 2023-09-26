import React from 'react'

export default function Header() {
  return (
    <div
      className='flex justify-between px-8 pt-8 py-5 w-full transition-all duration-500 fixed z-30
       bg-white dark:bg-color-primary backdrop-filter shadow-md dark:shadow-yellow-800'
    >
      <h4 className='dark:text-white text-gray-900 flex items-center font-black cursor-pointer text-3xl'>
        <span className='text-red-500'>Cook</span>Healthy
      </h4>

      <ul className='navbar-links flex justify-end items-center ml-64'>
        <li className='inline-block list-none'>
          {/* {navBars.map((nav) => {
        return (
          <a
            key={nav.id}
            className='text-gray-900 dark:text-white font-medium text-lg mr-16 my-2 no-underline tracking-wide cursor-pointer dark:hover:bg-gradient-to-r dark:from-[#ef571a] dark:to-[#b11804] hover:bg-gradient-to-r from-[#a5c233] to-[#2f8c07] hover:text-white hover:px-5 hover:py-3 hover:text-xl'
            href={nav.path}
          >
            {nav.name}
          </a>
        )
      })} */}
        </li>
      </ul>
      <div></div>
    </div>
  )
}
