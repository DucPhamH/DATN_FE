import Input from '../../../../components/InputComponents/Input'
import ModalLayout from '../../../../layouts/ModalLayout'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { schemaUpdateWorkout } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateWorkoutSchedule } from '../../../../apis/workoutScheduleApi'
import toast from 'react-hot-toast'
import { queryClient } from '../../../../main'
import { useMutation } from '@tanstack/react-query'
import Loading from '../../../../components/GlobalComponents/Loading'
import { useEffect } from 'react'

export default function ModalUpdateWorkout({ handleCloseModalUpdateWorkout, workout }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpdateWorkout),
    defaultValues: {
      name: '',
      calo_target: '',
      end_date: new Date()
    }
  })

  const onEndDateStateChange = (e) => {
    setValue('end_date', e)
  }

  useEffect(() => {
    if (workout) {
      setValue('name', workout.name)
      setValue('calo_target', workout.calo_target)
      setValue('end_date', new Date(workout.end_date))
    }
  }, [workout, setValue])

  const endDate = watch('end_date')

  const updateWorkoutMutation = useMutation({
    mutationFn: (body) => updateWorkoutSchedule(workout._id, body)
  })
  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      end_date: data.end_date
    }

    updateWorkoutMutation.mutate(newData, {
      onSuccess: async (data) => {
        console.log(data)
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
        toast.success('Cập nhật lịch trình thành công')
        handleCloseModalUpdateWorkout()
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalUpdateWorkout}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
              Chỉnh sửa lịch tập luyện
            </h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalUpdateWorkout}
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
                title='Nhập lượng calo muốn đốt cháy (cal)'
                type='number'
                name='calo_target'
                id='calo_target'
                register={register}
                errors={errors.calo_target}
                placeholder='Nhập lượng calo muốn đốt cháy của bạn'
              />
              <div className='flex flex-wrap items-center justify-between gap-1 mb-3'>
                <div className='w-full  flex flex-col'>
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
                {updateWorkoutMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>Chỉnh sửa lịch</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
