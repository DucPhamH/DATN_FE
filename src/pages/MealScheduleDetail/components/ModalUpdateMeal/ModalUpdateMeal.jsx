import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ModalLayout from '../../../../layouts/ModalLayout'
import { useEffect, useState } from 'react'
import Input from '../../../../components/InputComponents/Input'
import { useMutation } from '@tanstack/react-query'
import { updateMealSchedule } from '../../../../apis/mealScheduleApi'
import Loading from '../../../../components/GlobalComponents/Loading'
import { schemaUpdateMeal } from '../../../../utils/rules'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'

export default function ModalUpdateMeal({ handleCloseModalUpdateMeal, meal }) {
  const [openWeightTarget, setOpenWeightTarget] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpdateMeal),
    defaultValues: {
      name: '',
      purpose: 'DEFAULT',
      end_date: new Date()
    }
  })

  const onEndDateStateChange = (e) => {
    setValue('end_date', e)
  }

  useEffect(() => {
    if (meal) {
      setValue('name', meal.name)
      setValue('purpose', meal.purpose)
      setValue('end_date', new Date(meal.end_date))
      setValue('weight_target', meal.weight_target)
    }
  }, [meal, setValue])

  const purpose = watch('purpose')
  console.log(purpose)

  // nếu purpose là 0, 1 thì hiện weight_target
  useEffect(() => {
    if (purpose.toString() === '0' || purpose.toString() === '1') {
      setOpenWeightTarget(true)
    } else {
      setOpenWeightTarget(false)
    }
  }, [purpose])

  const endDate = watch('end_date')

  const updateMealMutation = useMutation({
    mutationFn: (body) => updateMealSchedule(meal._id, body)
  })
  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      end_date: data.end_date,
      weight_target: parseInt(data.weight_target)
    }

    // nếu weight_target là NaN và purpose là 2 thì xóa weight_target
    if (newData.purpose === '2') {
      delete newData.weight_target
    }
    // nếu weight_target là NaN và purpose là 0 hoặc 1 thì báo lỗi
    if (isNaN(newData.weight_target) && newData.purpose !== '2') {
      setError('weight_target', {
        type: 'manual',
        message: 'Nhập cân nặng mục tiêu'
      })
      return
    }
    console.log(newData)

    updateMealMutation.mutate(newData, {
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({
          queryKey: ['meal-info']
        })
        toast.success('Chỉnh sửa lịch ăn thành công')
        handleCloseModalUpdateMeal()
      },
      onError: (error) => {
        console.log(error)
        setError('weight_target', {
          type: 'manual',
          message: error.response.data.message
        })
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalUpdateMeal}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
              Chỉnh sửa lịch ăn uống
            </h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalUpdateMeal}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <form noValidate onSubmit={onSubmit} className='p-3'>
              <Input
                title='Nhập tên lịch tập'
                type='text'
                name='name'
                id='name'
                register={register}
                errors={errors.name}
                placeholder='Nhập tên lịch tập của bạn'
              />
              <div className='mb-2'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nhập mục tiêu
                </div>
                <select
                  defaultValue='DEFAULT'
                  {...register('purpose')}
                  className='select select-sm mb-1 border border-gray-300 bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT'>Nhập mục tiêu</option>
                  <option value='0'>Tăng cân</option>
                  <option value='1'>Giảm cân</option>
                  <option value='2'>Duy trì cân nặng</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.purpose?.message}
                </div>
              </div>
              {openWeightTarget && (
                <Input
                  title='Nhập cân nặng mục tiêu (kg)'
                  type='number'
                  name='weight_target'
                  id='weight_target'
                  register={register}
                  errors={errors.weight_target}
                  placeholder='Nhập cân nặng mục tiêu của bạn'
                />
              )}
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
                {updateMealMutation.isPending ? (
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
