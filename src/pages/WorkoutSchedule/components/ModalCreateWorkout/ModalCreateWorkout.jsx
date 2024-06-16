import Input from '../../../../components/InputComponents/Input'
import ModalLayout from '../../../../layouts/ModalLayout'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { schemaCreateWorkout } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createWorkoutSchedule } from '../../../../apis/workoutScheduleApi'
import toast from 'react-hot-toast'
import { queryClient } from '../../../../main'
import { useMutation } from '@tanstack/react-query'
import Loading from '../../../../components/GlobalComponents/Loading'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../../../contexts/app.context'

export default function ModalCreateWorkout({ handleCloseModalCreateWorkout }) {
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateWorkout),
    defaultValues: {
      name: '',
      weight: profile?.weight || '',
      calo_target: '',
      start_date: new Date(),
      end_date: new Date()
    }
  })

  const onStartDateStateChange = (e) => {
    setValue('start_date', e)
  }

  const onEndDateStateChange = (e) => {
    setValue('end_date', e)
  }

  const startDate = watch('start_date')
  const endDate = watch('end_date')

  // console.log(startDate)
  // console.log(endDate)
  const createWorkoutMutation = useMutation({
    mutationFn: (body) => createWorkoutSchedule(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)

    const newData = {
      ...data,
      start_date: data.start_date,
      end_date: data.end_date
    }

    createWorkoutMutation.mutate(newData, {
      onSuccess: (data) => {
        handleCloseModalCreateWorkout()
        navigate(`/schedule/ex-schedule/${data?.data.result._id}`)
        queryClient.invalidateQueries('workout-schedule')
        toast.success('Tạo lịch tập thành công')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalCreateWorkout}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
              Tạo lịch tập luyện mới
            </h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalCreateWorkout}
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
                title='Nhập tên lịch tập'
                type='text'
                name='name'
                id='name'
                register={register}
                errors={errors.name}
                placeholder='Nhập tên lịch tập của bạn'
              />
              <Input
                title='Nhập cân nặng (kg)'
                type='number'
                name='weight'
                id='weight'
                register={register}
                errors={errors.weight}
                placeholder='Nhập cân nặng của bạn'
              />
              <Input
                title='Nhập lượng calo muốn đốt cháy (cal)'
                type='number'
                name='calo_target'
                id='calo_target'
                register={register}
                errors={errors.calo_target}
                placeholder='Nhập lượng calo muốn đốt cháy của bạn'
              />
              <div className='flex flex-wrap items-center justify-between gap-1 mb-3'>
                {' '}
                <div className='w-full  flex flex-col'>
                  <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                    Nhập ngày bắt đầu
                  </label>
                  <DatePicker
                    className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                    minDate={new Date()}
                    selected={startDate}
                    onChange={onStartDateStateChange}
                  />
                  <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                    {errors?.start_date?.message}
                  </div>
                </div>
                <div className='w-full pb-2 flex flex-col'>
                  <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                    Nhập ngày kết thúc
                  </label>
                  <DatePicker
                    className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                    minDate={new Date()}
                    selected={endDate}
                    onChange={onEndDateStateChange}
                  />
                </div>
              </div>{' '}
              <div className='flex justify-center'>
                {createWorkoutMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tạo lịch mới</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
