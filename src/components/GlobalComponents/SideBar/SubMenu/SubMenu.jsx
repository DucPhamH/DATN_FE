import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'
import { NavLink, useLocation } from 'react-router-dom'

export default function Submenu({ data }) {
  const { pathname } = useLocation()
  // console.log(pathname)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  // console.log(data)
  // console.log(data.menus)
  return (
    <>
      <div
        className={`link-custom ${pathname.includes(data.path) && 'text-red-600 dark:text-yellow-500'}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className='min-w-max' />
        <p className='flex-1'>{data.name}</p>
        <IoIosArrowDown className={` ${subMenuOpen && 'rotate-180'} duration-200 `} />
      </div>
      <motion.div
        animate={
          subMenuOpen
            ? {
                height: 'fit-content'
              }
            : {
                height: 0
              }
        }
        className='flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden'
      >
        {data.menus?.map((menu) => (
          <div key={menu.subName}>
            <NavLink to={`/${data.path}/${menu.subPath}`} className='link-custom bg-transparent'>
              {menu.subName}
            </NavLink>
          </div>
        ))}
      </motion.div>
    </>
  )
}
