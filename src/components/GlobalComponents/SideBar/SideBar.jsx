import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import logo from '../../../assets/images/logo.png'

// * React icons
import { IoIosArrowBack } from 'react-icons/io'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineAppstore } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { HiOutlineDatabase } from 'react-icons/hi'
import { TbReportAnalytics } from 'react-icons/tb'
import { RiBuilding3Line } from 'react-icons/ri'
import { useMediaQuery } from 'react-responsive'
import { MdMenu } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import Submenu from './SubMenu'
import DarkMode from '../DarkMode'

export default function SideBar() {
  let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' })
  const [open, setOpen] = useState(isTabletMid ? false : true)
  const sidebarRef = useRef()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isTabletMid])

  useEffect(() => {
    isTabletMid && setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: '16rem',
          transition: {
            damping: 40
          }
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15
          }
        }
      }
    : {
        open: {
          width: '16rem',
          transition: {
            damping: 40
          }
        },
        closed: {
          width: '4rem',
          transition: {
            damping: 40
          }
        }
      }

  const subMenusList = [
    {
      name: 'build',
      icon: RiBuilding3Line,
      menus: ['auth', 'app settings', 'stroage', 'hosting']
    },
    {
      name: 'analytics',
      icon: TbReportAnalytics,
      menus: ['dashboard', 'realtime', 'events']
    }
  ]

  return (
    <div className=''>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${open ? 'block' : 'hidden'} `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? 'open' : 'closed'}
        className=' bg-white dark:bg-color-primary  dark:text-gray-300 text-gray shadow-lg dark:shadow-yellow-800  max-w-[16rem] w-[16rem] overflow-hidden fixed z-[999] h-screen relative'
      >
        <div className='flex items-center gap-2.5 font-medium py-3.5  mx-3'>
          <img src={logo} width={50} alt='icon-app' />
          <span className='text-2xl flex font-bold whitespace-pre'>
            <span className='text-red-500'>Cook</span>Healthy
            <DarkMode />
          </span>
        </div>

        <div className='flex flex-col h-full'>
          <ul className='whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]'>
            <li>
              <NavLink to={'/home'} className='link'>
                <AiOutlineAppstore size={25} className='min-w-max' />
                Cộng đồng
              </NavLink>
            </li>
            <li>
              <NavLink to={'/authentication'} className='link'>
                <BsPerson size={25} className='min-w-max' />
                Authentication
              </NavLink>
            </li>
            <li>
              <NavLink to={'/stroage'} className='link'>
                <HiOutlineDatabase size={25} className='min-w-max' />
                Stroage
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className='border-y py-5 border-slate-300 '>
                <small className='pl-3 text-slate-500 inline-block mb-2'>Product categories</small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className='flex flex-col gap-1'>
                    <Submenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={'/settings'} className='link'>
                <SlSettings size={25} className='min-w-max' />
                Settings
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className='flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  '>
              <div className='flex border-y border-slate-300 p-4 items-center justify-between'>
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className='text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl'>Upgrade</p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open)
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180
                }
          }
          transition={{ duration: 0 }}
          className='absolute w-fit h-fit md:block border border-black rounded-full dark:border-gray-200 hover:bg-red-600 transition-all z-50 hidden right-2 bottom-3 cursor-pointer'
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className='m-3 md:hidden absolute top-0 z-50' onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  )
}
