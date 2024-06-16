import { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { AppContext } from '../../contexts/app.context'
import CalculatorBox from './components/CalculatorBox'
import ModalCreateMeal from './components/ModalCreateMeal'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { getListMealSchedules } from '../../apis/mealScheduleApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import Pagination from '../../components/GlobalComponents/Pagination'
import MealItem from './components/MealItem'

export default function MealSchedule() {
  const { profile } = useContext(AppContext)
  const [openModalCalculator, setOpenModalCalculator] = useState(false)
  const handleCloseModalCalculator = () => {
    setOpenModalCalculator(false)
  }
  const [openModalMeal, setOpenModalMeal] = useState(false)
  const queryConfig = omit(useQueryConfig(), ['sort', 'status'])

  const handleCloseModalCreateMeal = () => {
    setOpenModalMeal(false)
  }
  const handleOpenModalCreateMeal = () => {
    setOpenModalMeal(true)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['meal-schedule', queryConfig],
    queryFn: () => {
      return getListMealSchedules(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  useEffect(() => {
    if (profile?.BMI === null || profile?.TDEE === null) {
      setOpenModalCalculator(true)
    }
  }, [profile])

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
                {profile?.BMI === null || profile?.TDEE === null ? null : (
                  <button
                    onClick={handleOpenModalCreateMeal}
                    className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                  >
                    <div className='flex justify-center gap-2 items-center'>
                      <FaPlus /> <div>Tạo lịch mới</div>
                    </div>
                  </button>
                )}
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
                    {data?.data?.result.mealSchedule.map((meal) => {
                      return <MealItem key={meal._id} meal={meal} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.mealSchedule.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Bạn chưa tạo lịch tập luyện nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination
                pageSize={data?.data.result.totalPage}
                queryConfig={queryConfig}
                url='/schedule/eat-schedule'
              />
            </div>
          )}
        </div>
      </div>
      {openModalCalculator && <CalculatorBox closeModal={handleCloseModalCalculator} />}
      {openModalMeal && <ModalCreateMeal handleCloseModalCreateMeal={handleCloseModalCreateMeal} />}
    </div>
  )
}
