import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ModalLayout from '../../../../layouts/ModalLayout'
import { useContext, useEffect } from 'react'
import Input from '../../../../components/InputComponents/Input'
import { useMutation } from '@tanstack/react-query'
import Loading from '../../../../components/GlobalComponents/Loading'
import { schemaUpdateProfile } from '../../../../utils/rules'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'
import { updateProfile } from '../../../../apis/userApi'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/auth'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'

export default function ModalUpdateMeal({ handleCloseModalUpdateProfile, user }) {
  // const [openWeightTarget, setOpenWeightTarget] = useState(false)
  const { setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpdateProfile),
    defaultValues: {
      name: '',
      birthday: new Date(),
      user_name: '',
      address: ''
    }
  })

  const onEndDateStateChange = (e) => {
    setValue('birthday', e)
  }

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('birthday', user.birthday ? new Date(user.birthday) : new Date())
      setValue('user_name', user.user_name)
      setValue('address', user.address)
    }
  }, [user, setValue])

  const birthday = watch('birthday')

  const updateProfileMutation = useMutation({
    mutationFn: (body) => updateProfile(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    if (data.user_name === user.user_name) {
      delete data.user_name
    }

    if (data.address === user.address || data.address === '') {
      delete data.address
    }

    updateProfileMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({
          queryKey: ['me']
        })
        setProfile(data?.data.result)
        setProfileToLS(data?.data.result)
        toast.success('Cập nhật thông tin cá nhân thành công')
        handleCloseModalUpdateProfile()
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          console.log(formError)
          if (formError?.address) {
            setError('address', {
              message: formError.address.msg,
              type: 'Server'
            })
          }
          if (formError?.user_name) {
            setError('user_name', {
              message: formError.user_name.msg,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalUpdateProfile}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
              Chỉnh sửa thông tin cá nhân
            </h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalUpdateProfile}
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
                title='Chỉnh sửa tên'
                type='text'
                name='name'
                id='name'
                register={register}
                errors={errors.name}
                placeholder='Nhập tên của bạn'
              />
              <Input
                title='Chỉnh sửa biệt danh'
                type='text'
                name='user_name'
                id='user_name'
                register={register}
                errors={errors.user_name}
                placeholder='Nhập biệt danh của bạn'
              />
              <Input
                title='Chỉnh sửa địa chỉ'
                type='text'
                name='address'
                id='address'
                register={register}
                errors={errors.address}
                placeholder='Nhập địa chỉ của bạn'
              />
              <div className='flex flex-wrap items-center justify-between gap-1 mb-3'>
                <div className='w-full  flex flex-col'>
                  <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                    Chỉnh sửa ngày sinh
                  </label>
                  <DatePicker
                    className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                    selected={birthday}
                    onChange={onEndDateStateChange}
                  />
                </div>
              </div>{' '}
              <div className='flex justify-center'>
                {updateProfileMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>Chỉnh sửa thông tin</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
