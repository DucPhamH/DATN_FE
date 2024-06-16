import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosCheckmarkCircle, IoMdHome } from 'react-icons/io'
import { completeDateMealItem, deleteDateMealItem, getDateMealItem, getMealSchedules } from '../../apis/mealScheduleApi'
import Loading from '../../components/GlobalComponents/Loading'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import { FaLightbulb } from 'react-icons/fa'
import { calculateDayExpected } from '../../utils/helper'
import ModalUpdateMeal from './components/ModalUpdateMeal'
import CreateItemSchedule from './components/CreateItemSchedule'
import { useInView } from 'react-intersection-observer'
import moment from 'moment'
import { MdCancel } from 'react-icons/md'
import { queryClient } from '../../main'
import toast from 'react-hot-toast'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart/PieChart'
import Counup from '../../components/GlobalComponents/Countup'

export default function MealScheduleDetail() {
  const { id } = useParams()
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [openModalMeal, setOpenModalMeal] = useState(false)

  const handleCloseModalUpdateMeal = () => {
    setOpenModalMeal(false)
  }

  const handleOpenModalUpdateMeal = () => {
    setOpenModalMeal(true)
  }

  const { data, isFetching } = useQuery({
    queryKey: ['meal-info', id],
    queryFn: () => {
      return getMealSchedules(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const meal = data?.data.result

  const { ref, inView } = useInView()
  const fetchDateItems = async ({ pageParam }) => {
    return await getDateMealItem({ page: pageParam, meal_schedule_id: meal?._id })
  }

  const checkNoteBMI = () => {
    if (profile.gender === 'male') {
      if (profile.BMI < 18.5) {
        return 'Bạn đang quá gầy, hãy ăn uống điều độ nhé !'
      }
      if (18.5 < profile.BMI && profile.BMI < 24.9) {
        return 'Chúc mừng bạn, cơ thể của bạn đang ở mức bình thường !'
      }
      if (profile.BMI >= 25) {
        return 'Bạn đang thừa cân, hãy tập luyện thể chất để giảm cân nhé !'
      }
      if (25 < profile.BMI && profile.BMI < 29.9) {
        return 'Bạn đang ở mức tiền béo phì, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (30 < profile.BMI && profile.BMI < 34.9) {
        return 'Bạn đang ở mức béo phì cấp độ I, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (35 < profile.BMI && profile.BMI < 39.9) {
        return 'Bạn đang ở mức béo phì cấp độ II, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (profile.BMI >= 40) {
        return 'Bạn đang ở mức béo phì cấp độ III, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
    }
    if (profile.gender === 'female') {
      if (profile.BMI < 18.5) {
        return 'Bạn đang quá gầy, hãy ăn uống điều độ nhé !'
      }
      if (18.5 < profile.BMI && profile.BMI < 22.9) {
        return 'Chúc mừng bạn, cơ thể của bạn đang ở mức bình thường !'
      }
      if (profile.BMI >= 23) {
        return 'Bạn đang thừa cân, hãy tập luyện thể chất để giảm cân nhé !'
      }
      if (23 < profile.BMI && profile.BMI < 24.9) {
        return 'Bạn đang ở mức tiền béo phì, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (25 < profile.BMI && profile.BMI < 29.9) {
        return 'Bạn đang ở mức béo phì cấp độ I, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (30 < profile.BMI && profile.BMI < 39.9) {
        return 'Bạn đang ở mức béo phì cấp độ II, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
      if (profile.BMI >= 40) {
        return 'Bạn đang ở mức béo phì cấp độ III, hãy chú ý đến chế độ ăn uống và tập luyện nhé !'
      }
    }
  }

  const {
    data: dateData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['date-meal-items', meal?._id],
    queryFn: fetchDateItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.mealDate.length ? allPages.length + 1 : undefined
      return nextPage
    },
    enabled: !!meal?._id,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const completeDateMealItemMutation = useMutation({
    mutationFn: (body) => completeDateMealItem(body)
  })

  const deleteDateMealItemMutation = useMutation({
    mutationFn: (body) => deleteDateMealItem(body)
  })

  const handleCompleteDateMealItem = (date) => {
    const newDate = moment(date).format('YYYY-MM-DD')

    completeDateMealItemMutation.mutate(
      {
        meal_schedule_id: meal?._id,
        date: newDate
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['date-meal-items']
            }),
            queryClient.invalidateQueries({
              queryKey: ['line-data-meal']
            }),
            queryClient.invalidateQueries({
              queryKey: ['meal-item']
            })
          ])
          toast.success('Nạp dinh dưỡng thành công')
        }
      }
    )
  }

  const handleDeleteDateMealItem = (date, is_completed) => {
    const newDate = moment(date).format('YYYY-MM-DD')
    deleteDateMealItemMutation.mutate(
      {
        meal_schedule_id: meal?._id,
        date: newDate,
        is_completed: is_completed
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['date-meal-items']
            }),
            queryClient.invalidateQueries({
              queryKey: ['line-data-meal']
            }),
            queryClient.invalidateQueries({
              queryKey: ['meal-item']
            })
          ])
          toast.success('Xóa lịch trình thành công')
        }
      }
    )
  }

  const content = dateData?.pages.map((dataItems) =>
    dataItems.data.result.mealDate.map((item) => {
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
              Tổng lượng dinh dưỡng đã nạp: {item.total_calories} cal - {item.total_protein} protein - {item.total_fat}{' '}
              fat - {item.total_carb} carb
            </h3>
            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {
                // nếu mealItem có unit bằng gram thì nhân quantity với 100

                item.items
                  .map((mealItem) =>
                    mealItem.unit === 'gram'
                      ? `${mealItem.meal_name} (${parseFloat(mealItem.quantity * 100).toFixed(1)} ${mealItem.unit}) : ${
                          mealItem.energy
                        } cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                      : `${mealItem.meal_name} (${mealItem.quantity} ${mealItem.unit}) : ${mealItem.energy} cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                  )
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleDeleteDateMealItem(item.date, 'true')}
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
              Tổng lượng dinh dưỡng đã nạp vào: {item.total_calories} cal - {item.total_protein} protein -{' '}
              {item.total_fat} fat - {item.total_carb} carb
            </h3>
            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {
                // nếu mealItem có unit bằng gram thì nhân quantity với 100

                item.items
                  .map((mealItem) =>
                    mealItem.unit === 'gram'
                      ? `${mealItem.meal_name} (${parseFloat(mealItem.quantity * 100).toFixed(1)} ${mealItem.unit}) : ${
                          mealItem.energy
                        } cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                      : `${mealItem.meal_name} (${mealItem.quantity} ${mealItem.unit}) : ${mealItem.energy} cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                  )
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleCompleteDateMealItem(item.date)}
                className='text-indigo-600 font-medium transition-all cursor-pointer text-sm hover:text-indigo-900'
              >
                Hoàn thành bù
              </div>
              <div
                onClick={() => handleDeleteDateMealItem(item.date, 'false')}
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
            <h3 className='text-lg font-semibold text-blue-400 '>
              Đang tiến hành nạp: {item.total_calories} cal - {item.total_protein} protein - {item.total_fat} fat -{' '}
              {item.total_carb} carb
            </h3>

            <p className='mb-2 text-base font-normal whitespace-pre-line text-gray-500 dark:text-gray-400'>
              {
                // nếu mealItem có unit bằng gram thì nhân quantity với 100

                item.items
                  .map((mealItem) =>
                    mealItem.unit === 'gram'
                      ? `${mealItem.meal_name} (${parseFloat(mealItem.quantity * 100).toFixed(1)} ${mealItem.unit}) : ${
                          mealItem.energy
                        } cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                      : `${mealItem.meal_name} (${mealItem.quantity} ${mealItem.unit}) : ${mealItem.energy} cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                  )
                  .join('\n') // nối các bài tập bằng dấu enter
              }
            </p>
            <div className='flex gap-2 items-center '>
              <div
                onClick={() => handleCompleteDateMealItem(item.date)}
                className='text-indigo-600 font-medium transition-all cursor-pointer text-sm hover:text-indigo-900'
              >
                Hoàn thành
              </div>
              <div
                onClick={() => handleDeleteDateMealItem(item.date, 'false')}
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
            Tổng lượng dinh dưỡng nạp vào dự kiến: {item.total_calories} cal - {item.total_protein} protein -{' '}
            {item.total_fat} fat - {item.total_carb} carb
          </h3>
          <p className='mb-2 text-base whitespace-pre-line font-normal text-gray-500 dark:text-gray-400'>
            {
              // nếu mealItem có unit bằng gram thì nhân quantity với 100

              item.items
                .map((mealItem) =>
                  mealItem.unit === 'gram'
                    ? `${mealItem.meal_name} (${parseFloat(mealItem.quantity * 100).toFixed(1)} ${mealItem.unit}) : ${
                        mealItem.energy
                      } cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                    : `${mealItem.meal_name} (${mealItem.quantity} ${mealItem.unit}) : ${mealItem.energy} cal - ${mealItem.protein} protein - ${mealItem.fat} fat - ${mealItem.carb} carb`
                )
                .join('\n') // nối các bài tập bằng dấu enter
            }
          </p>
          <div className='flex gap-2 items-center '>
            <div
              onClick={() => handleDeleteDateMealItem(item.date, 'false')}
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

  const checkMealWeight = () => {
    if (meal?.purpose === 0) {
      if (meal?.weight_target - profile.weight > 0) {
        return (
          <div className='m-1 flex  gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            <div>
              <span className='text-green-600 font-medium m-1'>Góc dự đoán:</span>
              Để đạt được mục tiêu{' '}
              <span className='font-medium text-blue-400'>
                tăng {meal.weight_target - profile.weight}kg cân nặng{' '}
              </span>{' '}
              thì mỗi ngày bạn cần phải nạp lượng calories nhiều hơn so với chỉ số TDEE{' '}
              <span className='font-medium text-blue-400'> khoảng 500 calories </span> và bạn sẽ mất{' '}
              <span className='font-medium text-blue-400'>
                {' '}
                khoảng {calculateDayExpected(meal?.weight_target, profile?.weight, meal?.purpose)} ngày
              </span>{' '}
              để đạt được mục tiêu đó.
              <p className='text-sm text-red-500 dark:text-red-300'>
                ( Lưu ý: chỉ là dự đoán, kết quả có thể thay đổi tùy vào cơ thể, cách ăn uống và tập luyện của bạn)
              </p>
            </div>
          </div>
        )
      }
      return (
        <div className='m-1 flex  gap-2'>
          <div className='mt-1'>
            <FaLightbulb />
          </div>
          <div>
            <span className='text-green-600 font-medium m-1'>Góc dự đoán:</span>
            <span className='text-red-600'>
              Hệ thống nhận thấy cân nặng của bạn đã vượt quá mục tiêu tăng cân. Bạn cần điều chỉnh lại mục tiêu tăng
              cân
            </span>
          </div>
        </div>
      )
    }
    if (meal?.purpose === 1) {
      if (meal?.weight_target - profile.weight < 0) {
        return (
          <div className='m-1 flex  gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            <div>
              <span className='text-green-600 font-medium m-1'>Góc dự đoán:</span>
              Để đạt được mục tiêu{' '}
              <span className='font-medium text-blue-400'>
                giảm {profile.weight - meal.weight_target}kg cân nặng{' '}
              </span>{' '}
              thì mỗi ngày bạn cần phải nạp lượng calories ít hơn so với chỉ số TDEE{' '}
              <span className='font-medium text-blue-400'> khoảng 500 calories </span> và bạn sẽ mất{' '}
              <span className='font-medium text-blue-400'>
                {' '}
                khoảng {calculateDayExpected(meal?.weight_target, profile?.weight, meal?.purpose)} ngày
              </span>{' '}
              để đạt được mục tiêu đó.
              <p className='text-sm text-red-500 dark:text-red-300'>
                ( Lưu ý: chỉ là dự đoán, kết quả có thể thay đổi tùy vào cơ thể, cách ăn uống và tập luyện của bạn)
              </p>
            </div>
          </div>
        )
      }
      return (
        <div className='m-1 flex  gap-2'>
          <div className='mt-1'>
            <FaLightbulb />
          </div>
          <div>
            <span className='text-green-600 font-medium m-1'>Góc dự đoán:</span>
            <span className='text-red-500'>
              Hệ thống nhận thấy cân nặng của bạn đã nhỏ hơn mục tiêu giảm cân. Bạn cần điều chỉnh lại mục tiêu giảm cân
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className='m-1 flex  gap-2'>
        <div className='mt-1'>
          <FaLightbulb />
        </div>
        <div>
          <span className='text-green-600 font-medium m-1'>Lưu ý:</span>
          Để đạt được mục tiêu <span className='font-medium text-blue-400'>giữ nguyên cân nặng </span> thì mỗi ngày bạn
          cần phải nạp lượng calories ngang bằng so với với chỉ số TDEE của bạn.
        </div>
      </div>
    )
  }

  return (
    <div className=' mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-4 items-center'>
            <div className='col-span-3  mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Chi tiết lịch trình: {meal?.name}</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className=' lg:col-span-1 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={() => navigate('/schedule/eat-schedule')}
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
                  {meal?.purpose === 0
                    ? 'Mục tiêu: Tăng cân'
                    : meal?.purpose === 1
                    ? 'Mục tiêu: Giảm cân'
                    : 'Mục tiêu: Duy trì cân nặng'}
                </p>
                <span className='text-sm text-gray-400 dark:text-gray-500'>
                  {moment(meal?.start_date).format('MMM Do YY')} - {moment(meal?.end_date).format('MMM Do YY')}
                </span>
              </div>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={handleOpenModalUpdateMeal}
                  className='flex justify-end btn btn-xs text-sm md:inline-block md:w-auto  bg-red-700 hover:bg-red-600 text-white rounded-md font-medium md:order-2'
                >
                  Chỉnh sửa lịch trình
                </button>
              </div>
            </div>
          </div>
          <div className='mx-2 mt-4  dark:bg-gray-900 rounded-lg font-medium text-sm bg-white p-3 tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
            <div className='m-1 flex  gap-2'>
              <div className='mt-1'>
                <FaLightbulb />
              </div>
              <div>
                <span className='text-green-600 font-medium m-1'>Có thể bạn chưa biết:</span>
                Theo nghiên cứu, nếu bạn tiêu thụ khoảng 3,500 dư lượng calo, bạn sẽ tăng thêm 1 pound (~0.45 kg). Xác
                định mục tiêu giảm cân hoặc tăng cân, bạn chỉ nên giảm hoặc tăng khoảng 500 calo mỗi ngày so với chỉ số
                TDEE để giảm hoặc tăng được 1 pound mỗi tuần. Không nên giảm hoặc tăng hơn 2 pound mỗi tuần vì theo
                nghiên cứu, giảm hoặc tăng quá nhanh sẽ gây ảnh hưởng lớn đến sức khỏe của bạn.
              </div>
            </div>
            {checkMealWeight()}
          </div>
          <div className='grid w-full mx-2 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2'>
            <div className='relative dark:bg-gray-900  bg-white py-6 px-6  w-full my-4 shadow-sm '>
              <div className='mt-2'>
                <p className='text-2xl font-semibold my-2'>
                  BMI <span className='text-base'>(Body Mass Index)</span>
                </p>
                <div>
                  <div className='flex space-x-2 text-gray-400 text-sm'>
                    <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                    <p>{profile.height} cm</p>
                  </div>
                  <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                    <span className='text-black dark:text-gray-300 font-medium'>Cân nặng:</span>
                    <p>{profile.weight} kg</p>
                  </div>
                </div>

                <div className='border-t-2 dark:border-gray-500' />
                <div className='flex justify-between gap-4'>
                  <div className='my-2'>
                    <p className='font-semibold text-base mb-2'>Lưu ý</p>
                    <p className='text-sm font-medium text-red-700 dark:text-pink-300'>{checkNoteBMI()}</p>
                  </div>
                  <div className='my-2 min-w-[80px]'>
                    <p className='font-semibold text-base mb-2'>Kết quả</p>
                    <Counup number={profile.BMI} title='kg/m^2' />
                  </div>
                </div>
              </div>
            </div>

            <div className='relative dark:bg-gray-900  bg-white py-6 px-6 w-full my-4 shadow-sm'>
              <div className='mt-2'>
                <p className='text-2xl font-semibold my-2'>
                  TDEE <span className='text-base'>(Total Daily Energy Expenditure)</span>
                </p>
                <div className='flex gap-x-4 flex-wrap '>
                  <div className=' text-gray-400 text-sm'>
                    <div className='flex space-x-2'>
                      <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                      <p>{profile.height} cm</p>
                    </div>
                    <div className='flex space-x-2 my-2'>
                      <span className='text-black dark:text-gray-300 font-medium '>Tuổi:</span>
                      <p>{profile.age}</p>
                    </div>
                  </div>
                  <div className='text-gray-400 text-sm'>
                    <div className='flex space-x-2'>
                      <span className='text-black dark:text-gray-300 font-medium'>Cân nặng:</span>
                      <p>{profile.weight} kg</p>
                    </div>
                    <div className='flex space-x-2 my-2'>
                      <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                      <p>{profile.gender}</p>
                    </div>
                  </div>
                  <div className=' text-gray-400 text-sm'>
                    <div className='flex space-x-2'>
                      <span className='text-black dark:text-gray-300 font-medium'>Mức độ hoạt động:</span>
                      <p>
                        {profile.activity_level === 1.2
                          ? 'Không có hoặc ít vận động'
                          : profile.activity_level === 1.375
                          ? 'Nhẹ: 1-3 ngày/tuần'
                          : profile.activity_level === 1.55
                          ? 'Vừa phải: 3-5 ngày/tuần'
                          : profile.activity_level === 1.725
                          ? 'Năng động: 6-7 ngày/tuần'
                          : 'Cực kỳ năng động, thể dục 2 lần/ngày'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-t-2 dark:border-gray-500' />
                <div className='flex justify-between gap-4'>
                  <div className='my-2'>
                    <p className='font-semibold text-base mb-2'>Có thể bạn chưa biết</p>
                    <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                      Bạn muốn giảm cân, hãy ăn ít calo hơn TDEE, bạn muốn tăng cân, hãy ăn nhiều calo hơn TDEE.
                    </p>
                  </div>
                  <div className='my-2  min-w-[80px]'>
                    <p className='font-semibold text-base mb-2'>Kết quả</p>
                    <Counup number={profile.TDEE} title='cal' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='grid w-full grid-cols-1 items-center  xl:grid-cols-3'>
            <PieChart meal={meal} profile={profile} />
            <LineChart meal={meal} />
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

          <CreateItemSchedule meal={meal} />
        </>
      )}
      {openModalMeal && <ModalUpdateMeal handleCloseModalUpdateMeal={handleCloseModalUpdateMeal} meal={meal} />}
    </div>
  )
}
