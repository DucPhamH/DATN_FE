import { useQuery } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { getWorkoutSchedule } from '../../apis/workoutScheduleApi'

import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import { IoMdHome } from 'react-icons/io'
import { useState } from 'react'
import CreateItemSchedule from './components/CreateItemSchedule'

export default function WorkoutScheduleDetail() {
  const [openCreate, setOpenCreate] = useState(false)

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }
  const handleCloseCreate = () => {
    setOpenCreate(false)
  }
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isFetching } = useQuery({
    queryKey: ['workout-info', id],
    queryFn: () => {
      return getWorkoutSchedule(id)
    }
  })

  const workout = data?.data.result
  console.log(workout)

  return (
    <div className=' mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-4 items-center'>
            <div className='col-span-3  mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Chi tiết lịch trình: {workout?.name}</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className=' lg:col-span-1 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'>
                  <div
                    onClick={() => navigate('/schedule/ex-schedule')}
                    className='flex gap-1 items-center justify-center'
                  >
                    <IoMdHome />
                    Trở về trang lập lịch
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-2'>
        <p className='font-medium text-lg'>Mục tiêu: {workout?.calo_target} cal</p>
        <p className='font-medium '>Đã đạt được: {workout?.total_calo_burn} cal</p>
      </div>

      <div className='grid w-full grid-cols-1 items-center  xl:grid-cols-3'>
        <div className='bg-white mx-2 col-span-1 flex justify-center  lg:h-[25rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
          <PieChart workout={workout} />
        </div>
        <div className='bg-white mx-2 col-span-2 flex justify-center lg:h-[25rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
          <LineChart />
        </div>
      </div>

      <div className='bg-white mx-2 max-h-[40rem] overflow-auto  px-10 py-10 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
        <ol className='relative border-s border-gray-200 dark:border-gray-700'>
          <li className='mb-10 ms-4'>
            <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700' />
            <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              February 2022
            </time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Application UI code in Tailwind CSS</h3>
            <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
              Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
              E-commerce &amp; Marketing pages.
            </p>
          </li>
          <li className='mb-10 ms-4'>
            <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700' />
            <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>March 2022</time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Marketing UI design in Figma</h3>
            <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
              All of the pages and components are first designed in Figma and we keep a parity between the two versions
              even as we update the project.
            </p>
          </li>
          <li className='ms-4'>
            <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700' />
            <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>April 2022</time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>E-Commerce UI code in Tailwind CSS</h3>
            <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
              Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
            </p>
          </li>
        </ol>
      </div>
      <div className='flex mt-5 mx-2 gap-2 my-4 flex-wrap xl:justify-end items-center'>
        <button
          onClick={handleOpenCreate}
          className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <FaPlus />
            Thêm
          </div>
        </button>
        <button className='block btn btn-sm md:inline-block md:w-auto  bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
          <div className='flex gap-1 items-center justify-center'>Đồng bộ cân nặng với module tính toán</div>
        </button>
      </div>
      {openCreate && <CreateItemSchedule workout={workout} handleCloseCreate={handleCloseCreate} />}
    </div>
  )
}
