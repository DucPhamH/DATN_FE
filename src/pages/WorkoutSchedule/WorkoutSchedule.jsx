import React from 'react'
import { FaPlus } from 'react-icons/fa'
import ModalCreateWorkout from './components/ModalCreateWorkout'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getListWorkoutSchedules } from '../../apis/workoutScheduleApi'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import WorkoutItem from './components/WorkoutItem'
import Loading from '../../components/GlobalComponents/Loading'
import Pagination from '../../components/GlobalComponents/Pagination'

export default function WorkoutSchedule() {
  const [openModalWorkout, setOpenModalWorkout] = React.useState(false)
  const queryConfig = omit(useQueryConfig(), ['sort', 'status'])
  const handleCloseModalCreateWorkout = () => {
    setOpenModalWorkout(false)
  }
  const handleOpenModalCreateWorkout = () => {
    setOpenModalWorkout(true)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['workout-schedule', queryConfig],
    queryFn: () => {
      return getListWorkoutSchedules(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  return (
    <div className='h-screen mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-6 items-center'>
            <div className='col-span-2 lg:col-span-1 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Lịch trình đã tạo</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={handleOpenModalCreateWorkout}
                  className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <div className='flex justify-center gap-2 items-center'>
                    <FaPlus /> <div>Tạo lịch mới</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className=' border-[2px] scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                <table className=' w-full shadow-md  divide-y divide-gray-200'>
                  <thead className='bg-gray-50 dark:bg-slate-800 '>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Tên lịch
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Mục tiêu
                      </th>

                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Ngày bắt đầu
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Ngày kết thúc
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                    {data?.data?.result.workoutSchedule.map((workout) => {
                      return <WorkoutItem key={workout._id} workout={workout} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.workoutSchedule.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Bạn chưa tạo lịch tập luyện nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination
                pageSize={data?.data.result.totalPage}
                queryConfig={queryConfig}
                url='/schedule/ex-schedule'
              />
            </div>
          )}
        </div>
      </div>
      {openModalWorkout && <ModalCreateWorkout handleCloseModalCreateWorkout={handleCloseModalCreateWorkout} />}
    </div>
  )
}
