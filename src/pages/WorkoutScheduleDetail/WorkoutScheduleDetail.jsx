import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  completeDateWorkoutItem,
  deleteDateWorkoutItem,
  getDateWorkoutItem,
  getWorkoutSchedule,
  syncWeight
} from '../../apis/workoutScheduleApi'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import { IoMdHome } from 'react-icons/io'
import CreateItemSchedule from './components/CreateItemSchedule'
import Loading from '../../components/GlobalComponents/Loading'
import { useInView } from 'react-intersection-observer'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import toast from 'react-hot-toast'
import { queryClient } from '../../main'
import ModalUpdateWorkout from './components/ModalUpdateWorkout'
import { AppContext } from '../../contexts/app.context'

export default function WorkoutScheduleDetail() {
  const { id } = useParams()
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [openModalWorkout, setOpenModalWorkout] = useState(false)

  const handleCloseModalUpdateWorkout = () => {
    setOpenModalWorkout(false)
  }

  const handleOpenModalUpdateWorkout = () => {
    setOpenModalWorkout(true)
  }
  const syncWeightWorkoutMutation = useMutation({
    mutationFn: (body) => syncWeight(body)
  })

  const handleSyncWeightWorkout = () => {
    syncWeightWorkoutMutation.mutate(
      {
        workout_schedule_id: id
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['date-items']
            }),
            queryClient.invalidateQueries({
              queryKey: ['line-data']
            }),
            queryClient.invalidateQueries({
              queryKey: ['workout-info']
            })
          ])
          toast.success('Đồng bộ cân nặng thành công')
        }
      }
    )
  }
  const { data, isFetching } = useQuery({
    queryKey: ['workout-info', id],
    queryFn: () => {
      return getWorkoutSchedule(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const workout = data?.data.result

  const { ref, inView } = useInView()
  const fetchDateItems = async ({ pageParam }) => {
    return await getDateWorkoutItem({ page: pageParam, workout_schedule_id: workout?._id })
  }
  const checkWeight = () => {
    if (profile?.weight === null || profile?.weight === undefined) {
      return false
    }
    // check cân nặng của người dùng có bằng schedule weight hay không
    if (profile?.weight === workout?.weight) {
      return false
    }
    if (profile?.weight !== workout?.weight) {
      return true
    }
  }

  const {
    data: dateData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['date-items', workout?._id],
    queryFn: fetchDateItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.workoutDate.length ? allPages.length + 1 : undefined
      return nextPage
    },
    enabled: !!workout?._id,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const completeDateWorkOutItemMutation = useMutation({
    mutationFn: (body) => completeDateWorkoutItem(body)
  })

  const deleteDateWorkOutItemMutation = useMutation({
    mutationFn: (body) => deleteDateWorkoutItem(body)
  })

  const handleCompleteDateWorkOutItem = (date) => {
    // dùng moment fomat date thành string với định dạng yyyy-MM-DD

    const newDate = moment(date).format('YYYY-MM-DD')

    completeDateWorkOutItemMutation.mutate(
      {
        workout_schedule_id: workout?._id,
        date: newDate
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['date-items']
            }),
            queryClient.invalidateQueries({
              queryKey: ['line-data']
            }),
            queryClient.invalidateQueries({
              queryKey: ['workout-info']
            })
          ])
          toast.success('Hoàn thành bài tập thành công')
        }
      }
    )
  }

  const handleDeleteDateWorkOutItem = (date, is_completed) => {
    const newDate = moment(date).format('YYYY-MM-DD')
    deleteDateWorkOutItemMutation.mutate(
      {
        workout_schedule_id: workout?._id,
        date: newDate,
        is_completed: is_completed
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['date-items']
            }),
            queryClient.invalidateQueries({
              queryKey: ['line-data']
            }),
            queryClient.invalidateQueries({
              queryKey: ['workout-info']
            })
          ])
          toast.success('Xóa bài tập thành công')
        }
      }
    )
  }

  const content = dateData?.pages.map((dataItems) =>
    dataItems.data.result.workoutDate.map((item) => {
      if (item.is_completed) {
        return (
          <li key={item.date} className='mb-10 ms-4'>
            <div className='absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ' />
            <div className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              <div className='flex gap-3 items-center'>
                {moment(item.date).format('MMM Do YY')}
                <span className=' flex'>
                  Đã hoàn thành <IoIosCheckmarkCircle className='mx-1 text-green-500' />
                </span>
              </div>
            </div>

            <h3 className='text-lg font-semibold text-green-700 dark:text-green-500 '>
              Tổng lượng calo đã đốt cháy: {item.total_calories} cal
            </h3>
            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {/* // map ra tên các bài tập và nối với lượng calo đốt cháy của từng bài tập bằng dấu - và nối các bài tập bằng dấu enter */}
              {
                item.items
                  .map((workoutItem) => `${workoutItem.activity_name} - ${workoutItem.calo_burn} cal`)
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleDeleteDateWorkOutItem(item.date, 'true')}
                className=' cursor-pointer font-medium text-sm transition-all text-red-600 hover:text-red-900'
              >
                Xóa
              </div>
            </div>
          </li>
        )
      }

      // nếu item chưa completed và ngày tháng năm của item nhỏ hơn ngày tháng năm hiện tại thì cho màu đỏ
      if (moment(item.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
        return (
          <li key={item.date} className='mb-10 ms-4'>
            <div className='absolute w-3 h-3 bg-red-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ' />
            <div className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              <div className='flex gap-3 items-center'>
                {moment(item.date).format('MMM Do YY')}
                <span className='flex'>
                  Chưa hoàn thành <MdCancel className='mx-1 text-red-500' />
                </span>
              </div>
            </div>
            <h3 className='text-lg font-semibold text-red-700 dark:text-red-500 '>
              Tổng lượng calo đã đốt cháy: {item.total_calories} cal
            </h3>
            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {
                item.items
                  .map((workoutItem) => `${workoutItem.activity_name} - ${workoutItem.calo_burn} cal`)
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleCompleteDateWorkOutItem(item.date)}
                className='text-indigo-600 font-medium transition-all cursor-pointer text-sm hover:text-indigo-900'
              >
                Hoàn thành bù
              </div>
              <div
                onClick={() => handleDeleteDateWorkOutItem(item.date, 'false')}
                className='cursor-pointer font-medium text-sm transition-all text-red-600 hover:text-red-900'
              >
                Xóa
              </div>
            </div>
          </li>
        )
      }

      // so sánh ngày tháng năm trừ giờ phút giây của date item với ngày tháng năm trừ giờ phút giây hiện tại
      if (moment(item.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        return (
          <li key={item.date} className='mb-10 ms-4'>
            <div className='absolute w-3 h-3 bg-blue-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ' />
            <div className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              {moment(item.date).format('MMM Do YY')}
              <span className='m-3'>Đang tiến hành</span>
            </div>
            <h3 className='text-lg font-semibold text-blue-400 '>Đang tiến hành đốt cháy: {item.total_calories} cal</h3>

            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {
                item.items
                  .map((workoutItem) => `${workoutItem.activity_name} - ${workoutItem.calo_burn} cal`)
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleCompleteDateWorkOutItem(item.date)}
                className='text-indigo-600 font-medium transition-all cursor-pointer text-sm hover:text-indigo-900'
              >
                Hoàn thành
              </div>
              <div
                onClick={() => handleDeleteDateWorkOutItem(item.date, 'false')}
                className='cursor-pointer font-medium text-sm transition-all text-red-600 hover:text-red-900'
              >
                Xóa
              </div>
            </div>
          </li>
        )
      }
      return (
        <li key={item.date} className='mb-10 ms-4'>
          <div className='absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700' />
          <div className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
            {moment(item.date).format('MMM Do YY')}
            <span className='m-3'>Dự kiến</span>
          </div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Tổng lượng calo đốt cháy dự kiến: {item.total_calories} cal
          </h3>
          <p className='mb-2 text-base whitespace-pre-line font-normal text-gray-500 dark:text-gray-400'>
            {
              item.items.map((workoutItem) => `${workoutItem.activity_name} - ${workoutItem.calo_burn} cal`).join('\n') // nối các bài tập bằng dấu enter
            }
          </p>
          <div className='flex gap-2 items-center '>
            <div
              onClick={() => handleDeleteDateWorkOutItem(item.date, 'false')}
              className=' cursor-pointer font-medium text-sm transition-all text-red-600 hover:text-red-900'
            >
              Xóa
            </div>
          </div>
        </li>
      )
    })
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
                <button
                  onClick={() => navigate('/schedule/ex-schedule')}
                  className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:order-2'
                >
                  <div className='flex gap-1 items-center justify-center'>
                    <IoMdHome />
                    Trở về trang lập lịch
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className='mx-2 mt-3'>
            <div className='flex gap-2 flex-wrap lg:justify-between items-center'>
              <div className=''>
                <p className='font-medium text-lg'>
                  Đã hoàn thành: {workout?.total_calo_burn} / {workout?.calo_target} calories
                </p>
                <span className='text-sm text-gray-400 dark:text-gray-500'>
                  {moment(workout?.start_date).format('MMM Do YY')} - {moment(workout?.end_date).format('MMM Do YY')}
                </span>
              </div>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={handleOpenModalUpdateWorkout}
                  className='flex justify-end btn btn-xs text-sm md:inline-block md:w-auto  bg-red-700 hover:bg-red-600 text-white rounded-md font-medium md:order-2'
                >
                  Chỉnh sửa lịch trình
                </button>
                {checkWeight() && (
                  <button
                    onClick={handleSyncWeightWorkout}
                    className='flex justify-end btn btn-xs text-sm md:inline-block md:w-auto bg-gray-700  text-white rounded-md font-medium md:order-2'
                  >
                    Đồng bộ hóa cân nặng
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className='grid w-full grid-cols-1 items-center  xl:grid-cols-3'>
            <PieChart workout={workout} />
            <LineChart workout={workout} />
          </div>

          <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 max-h-[40rem] overflow-auto  px-10 py-10 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
            <ol className='relative border-s border-gray-200 dark:border-gray-700'>
              {content}
              <div ref={ref}>
                {isFetchingNextPage ? (
                  <Loading />
                ) : (
                  <div className='flex justify-center font-medium'>Không còn lịch nào</div>
                )}
              </div>
            </ol>
          </div>

          <div className='mx-2 mt-10'>
            <div className=''>
              <div className='grid xl:grid-cols-4 items-center'>
                <div className='col-span-3  mb-2'>
                  <div className='text-xl font-medium mb-2'>
                    <span>Tạo ngày tập luyện mới</span>
                  </div>
                  <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
                </div>
              </div>
            </div>
          </div>

          <CreateItemSchedule workout={workout} />
        </>
      )}
      {openModalWorkout && (
        <ModalUpdateWorkout workout={workout} handleCloseModalUpdateWorkout={handleCloseModalUpdateWorkout} />
      )}
    </div>
  )
}
