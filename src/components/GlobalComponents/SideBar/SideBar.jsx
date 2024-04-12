import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { motion } from 'framer-motion'
// * React icons
import { FaCookieBite, FaShareAlt } from 'react-icons/fa'
import { BsFillCalendarHeartFill, BsFillHeartFill, BsPeopleFill } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
import { MdMenu } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import Submenu from './SubMenu'
import { FaPenToSquare } from 'react-icons/fa6'
import { IoMdAlbums } from 'react-icons/io'
import { MdBook } from 'react-icons/md'
import Logo from '../Logo'

export default function SideBar() {
  let isTabletMid = useMediaQuery({ query: '(max-width: 767px)' })
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

  const Nav_animation = {
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

  const subMenusList = [
    {
      name: 'Sức khoẻ',
      icon: BsFillHeartFill,
      menus: [
        { subName: 'Công cụ tính toán', subPath: 'fitness-caculator' },
        { subName: 'Lịch sử tính toán', subPath: 'fitness-history' }
      ],
      path: 'fitness'
    },
    {
      name: 'Lịch trình',
      icon: BsFillCalendarHeartFill,
      menus: [
        { subName: 'Lịch trình ăn uống', subPath: 'eat-schedule' },
        { subName: 'Lịch trình tập luyện', subPath: 'ex-schedule' }
      ],
      path: 'schedule'
    },
    {
      name: 'Tạo bài viết',
      icon: FaPenToSquare,
      menus: [
        { subName: 'Tạo bài viết nấu ăn', subPath: 'food-list' },
        { subName: 'Tạo blog dinh dưỡng', subPath: 'blog-list' }
      ],
      path: 'chef'
    }
  ]

  return (
    <div className='fixed z-[100]'>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[80] bg-black/50 ${open ? 'block' : 'hidden'} `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? 'open' : 'closed'}
        className=' bg-white dark:bg-color-primary-dark dark:text-gray-300 text-gray shadow-md dark:shadow-yellow-800 max-w-[16rem] w-[16rem] overflow-hidden z-[999] h-screen relative'
      >
        <Logo />

        <div className='flex flex-col h-full'>
          <ul className='whitespace-pre  px-2.5 pt-4 pb-4 flex flex-col gap-3 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 md:h-[72%] h-[70%]'>
            <li>
              <NavLink to={'/home'} className='link-custom '>
                <BsPeopleFill size={25} className='min-w-max' />
                Cộng đồng
              </NavLink>
            </li>
            <li>
              <NavLink to={'/cooking'} className='link-custom '>
                <FaCookieBite size={25} className='min-w-max' />
                Nấu ăn
              </NavLink>
            </li>
            <li>
              <NavLink to={'/album'} className='link-custom '>
                <IoMdAlbums size={25} className='min-w-max' />
                Album
              </NavLink>
            </li>
            <li>
              <NavLink to={'/blog'} className='link-custom '>
                <FaShareAlt size={25} className='min-w-max' />
                Góc chia sẻ
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className='border-y py-5 border-slate-300 '>
                <small className='pl-3 text-slate-500 inline-block mb-2'>Người dùng</small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className='flex flex-col gap-1'>
                    <Submenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={'/settings'} className='link-custom '>
                <MdBook size={25} className='min-w-max' />
                Mục đã lưu
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className='flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full  font-medium  '>
              <div className='flex border-y border-slate-300 p-4 items-center justify-between'>
                <div>
                  <p className='text-red-500 pb-1'>Bạn có phải đầu bếp ?</p>
                  <small>Hãy liên hệ với chúng tôi !</small>
                </div>
                <p className='text-red-800 cursor-pointer hover:text-red-400 py-1.5 px-3 text-xs bg-teal-50 dark:bg-teal-100 rounded-xl'>
                  Liên hệ
                </p>
              </div>
            </div>
          )}
        </div>
        {/* <motion.div
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
        </motion.div> */}
      </motion.div>
      <div
        className='my-3 cursor-pointer hover:text-red-600 transition-all ml-4 mr-3 md:hidden absolute top-2 z-50'
        onClick={() => setOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  )
}
