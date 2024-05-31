import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { omit } from 'lodash'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getActivities } from '../../../../apis/activityApi'
import { useForm } from 'react-hook-form'
import Loading from '../../../../components/GlobalComponents/Loading'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import Input from '../../../../components/InputComponents/Input'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddItemWorkout, schemaAddTimeWorkout } from '../../../../utils/rules'
import { v4 as uuidv4 } from 'uuid'
import ModalLayout from '../../../../layouts/ModalLayout'
import toast from 'react-hot-toast'
import { createWorkoutItem } from '../../../../apis/workoutScheduleApi'
import PaginationNotUrl from '../../../../components/GlobalComponents/PaginationNotUrl'
import { queryClient } from '../../../../main'
export default function CreateItemSchedule({ workout }) {
  const [workoutState, setWorkoutState] = useState([])
  const [timeWorkout, setTimeWorkout] = useState(workout?.start_date ? new Date(workout?.start_date) : new Date())

  const [query, setQuery] = useState({
    page: '1'
  })

  const { data, isLoading } = useQuery({
    queryKey: ['list-activity', query],
    queryFn: () => {
      return getActivities(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { register: registerActivity, handleSubmit: handleSubmitActivity } = useForm({
    defaultValues: {
      searchActivity: query.search || ''
    }
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activity_name: '',
      met: '',
      time: ''
    },
    resolver: yupResolver(schemaAddItemWorkout)
  })

  const handleChangeTime = (e) => {
    console.log(e)
    setTimeWorkout(e)
  }

  const onSubmit = handleSubmit((data) => {
    // thêm id ngẫu nhiên của workout vào data
    const dataWithId = { ...data, id: uuidv4() }
    setWorkoutState((prev) => [...prev, dataWithId])
    reset()
  })

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      setQuery((prev) => {
        return omit(prev, ['activity_category'])
      })
    } else {
      setQuery((prev) => {
        return { ...prev, activity_category: e.target.value }
      })
    }
  }

  const onSubmitSearch = handleSubmitActivity((data) => {
    if (data.searchActivity === '') {
      return setQuery((prev) => omit(prev, ['activity_category', 'page', 'search']))
    }
    setQuery((prev) => {
      return omit({ ...prev, search: data.searchActivity }, ['activity_category', 'page'])
    })
  })

  const createWorkOutItemMutation = useMutation({
    mutationFn: (body) => createWorkoutItem(body)
  })

  const onSubmitAddActivity = (e) => {
    e.preventDefault()

    if (workoutState.length === 0) {
      toast.error('Chưa có hoạt động nào được thêm')
      return
    }

    // thêm thời gian tập luyện vào mảng và loại bỏ id
    const arrayWorkoutItems = workoutState.map((item) => {
      return {
        activity_name: item.activity_name,
        time: item.time,
        met: item.met,
        workout_schedule_id: workout._id,
        current_date: timeWorkout
      }
    })

    // call api add activity

    createWorkOutItemMutation.mutate(arrayWorkoutItems, {
      onSuccess: async (data) => {
        console.log(data)
        toast.success('Thêm hoạt động thành công')
        setWorkoutState([])
        // queryClient.invalidateQueries('date-items')
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
      },
      onError: () => {
        console.log('error')
      }
    })
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 mx-2 gap-2'>
      <div className=' max-w-3xl w-full p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary   border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Thêm ngày tập luyện</h2>
        <form noValidate onSubmit={onSubmitAddActivity} className=''>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-2'>
            <div className='sm:col-span-2'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nhập ngày tập luyện
                </label>
                <DatePicker
                  className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                  minDate={workout?.start_date}
                  maxDate={workout?.end_date}
                  selected={timeWorkout}
                  onChange={handleChangeTime}
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Hoạt động được thêm
                </label>
                {workoutState.length === 0 ? (
                  <div className='text-gray-500 dark:text-gray-300'>Chưa có hoạt động nào được thêm</div>
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên hoạt động
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Thời gian
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Xóa
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                      {workoutState.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.activity_name}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.time} phút
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <button
                                onClick={() => {
                                  setWorkoutState((prev) => prev.filter((i) => i.id !== item.id))
                                }}
                                className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
                              >
                                <div className='flex gap-1 items-center justify-center'>X</div>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {createWorkOutItemMutation.isPending ? (
            <button disabled className='block my-5 btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
              <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
            </button>
          ) : (
            <button className='btn my-5 btn-sm text-white hover:bg-red-900 bg-red-800'> Lưu</button>
          )}
        </form>
        <form onSubmit={onSubmit} className='mt-10' noValidate>
          <p className='text-sm my-3 font-semibold border-t border-gray-400 pt-2 mt-5 italic'>
            Chú ý: nếu bạn không tìm thấy hoạt động nào phù hợp, vui lòng nhập vào form bên dưới
          </p>

          <Input
            title='Nhập tên hoạt động'
            type='text'
            name='activity_name'
            id='activity_name'
            register={register}
            errors={errors.activity_name}
            placeholder='Nhập tên hoạt động'
          />
          <Input
            title='Nhập chỉ số met'
            type='number'
            name='met'
            register={register}
            errors={errors.met}
            id='met'
            placeholder='Nhập chỉ số met'
          />
          <Input
            title='Nhập thời gian (phút)'
            type='number'
            register={register}
            errors={errors.time}
            name='time'
            id='time'
            placeholder='Nhập thời gian'
          />

          <button className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
            <div className='flex gap-1 items-center justify-center'>Thêm hoạt động</div>
          </button>
        </form>
      </div>

      <div className=' blog-view  max-w-3xl w-full dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Bảng tham khảo hoạt động:</h2>
        <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
          <main className=' '>
            <div className='mx-1'>
              <div className='font-medium mb-2'></div>
              <div className='mb-2'>
                <div className='flex flex-wrap gap-3  items-center'>
                  <form
                    id='form-activity'
                    onSubmit={onSubmitSearch}
                    noValidate
                    className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'
                  >
                    <div className='relative'>
                      <input
                        autoComplete='off'
                        type='search'
                        id='search_input'
                        {...registerActivity('searchActivity')}
                        placeholder='Tìm kiếm bài viết'
                        className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                      />
                      <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                        <AiOutlineSearch />
                      </button>
                    </div>
                  </form>

                  <select
                    defaultValue={query.activity_category || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select select-sm my-2  bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    <option value='Đi xe đạp'>Đi xe đạp</option>
                    <option value='Bài tập thể dục'>Bài tập thể dục</option>
                    <option value='Múa'>Múa</option>
                    <option value='Chạy'>Chạy</option>
                    <option value='Thể thao'>Thể thao</option>
                    <option value='Đi bộ'>Đi bộ</option>
                    <option value='Hoạt động dưới nước'>Dưới nước</option>
                  </select>
                </div>
              </div>
              <div className='border-[2px] my-3 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                {isLoading ? (
                  <Loading className='w-full my-3 flex justify-center' />
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên hoạt động
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Thêm
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                      {data?.data?.result.activities.map((activity) => {
                        return (
                          <AcitivityItem
                            workoutState={workoutState}
                            setWorkoutState={setWorkoutState}
                            key={activity._id}
                            activity={activity}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              {data?.data.result.activities.length === 0 && (
                <div className='flex justify-center items-center py-4'>
                  <div className='text-gray-500 dark:text-gray-300'>Không có hoạt động nào</div>
                </div>
              )}
              {data?.data.result.totalPage > 1 && (
                <div className='flex justify-center mb-5 items-center'>
                  <PaginationNotUrl pageSize={data?.data.result.totalPage} query={query} setQuery={setQuery} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

const AcitivityItem = ({ activity, workoutState, setWorkoutState }) => {
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      time: ''
    },
    resolver: yupResolver(schemaAddTimeWorkout)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // thêm id vào data
    // nếu đã tồn tại 1 item trong workoutState thì sẽ không thêm vào
    const isExist = workoutState.find((item) => item.id === activity._id)
    if (isExist) {
      setError('time', {
        type: 'manual',
        message: 'Hoạt động đã tồn tại'
      })
      return
    }
    const dataWithId = {
      activity_name: activity.activity,
      time: data.time,
      id: activity._id,
      // chuyển đổi met từ string sang number
      met: parseFloat(activity.met)
    }
    console.log(dataWithId)
    setWorkoutState((prev) => [...prev, dataWithId])
    setOpenModal(false)
    reset()
  })
  return (
    <tr>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{activity.activity}</span>
      </td>
      <td className='px-6 py-4 '>
        <button
          onClick={() => {
            setOpenModal(true)
          }}
          className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <FaPlus />
          </div>
        </button>
        {openModal && (
          <ModalLayout
            closeModal={() => setOpenModal(false)}
            className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
          >
            <div className='relative w-full max-w-md max-h-full'>
              <div className=''>
                <div className='flex justify-between'>
                  <div className='px-3 py-1'></div>
                  <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
                    Thêm thời gian hoạt động
                  </h3>
                  <div className='text-2xl font-semibold'>
                    <span
                      onClick={() => setOpenModal(false)}
                      className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
                    >
                      &times;
                    </span>
                  </div>
                </div>

                <div className='border dark:border-gray-700 border-red-200 '></div>
                <section className='w-full mx-auto items-center '>
                  <form onSubmit={onSubmit} noValidate className='p-3'>
                    <Input
                      title='Nhập thời gian (phút)'
                      type='number'
                      name='time'
                      id='time'
                      register={register}
                      errors={errors.time}
                      placeholder='Nhập thời gian'
                    />

                    <div className='flex justify-center'>
                      <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Thêm hoạt động</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </ModalLayout>
        )}
      </td>
    </tr>
  )
}
