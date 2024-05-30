import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../../components/InputComponents/Input'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendOtp } from '../../../../apis/authApi'

import { useMutation } from '@tanstack/react-query'
import { schemaSendOtp } from '../../../../utils/rules'
import toast from 'react-hot-toast'
import Loading from '../../../../components/GlobalComponents/Loading'

export default function SendEmail() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaSendOtp)
  })
  const sendOtpMutation = useMutation({
    mutationFn: (body) => sendOtp(body)
  })
  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
      sendOtpMutation.mutate(data, {
        onError: (errors) => {
          console.log(errors)
          setError('email', {
            type: 'manual',
            message: errors?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại'
          })
        },
        onSuccess: (data) => {
          console.log(data)
          toast.success('Gửi mã OTP thành công')
          navigate(`/forgot-password/confirm-otp?email=${data.data.result}`)
        }
      })
    },
    (errors) => {
      console.log(errors)
    }
  )

  return (
    <MotionWrapper
      variants={{
        offscreen: {
          opacity: 0,
          y: 30
        },
        onscreen: {
          opacity: 1,
          y: 0
        }
      }}
    >
      <main className='w-full  max-w-md mx-auto p-6'>
        <div className='mt-7 bg-white  rounded-xl shadow-lg  border-2 border-indigo-300'>
          <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 '>Quên mật khẩu ?</h1>
              <p className='mt-2 text-sm text-gray-600 '>
                Bạn nhớ mật khẩu ?
                <Link to='/login' className='text-blue-600 ml-2 decoration-2 hover:underline font-medium' href='#'>
                  Đăng nhập ở đây
                </Link>
              </p>
            </div>
            <div className='mt-5'>
              <form onSubmit={onSubmit}>
                <div className='grid gap-y-4'>
                  <div>
                    <Input
                      title='Email của bạn'
                      type='email'
                      name='email'
                      id='email'
                      register={register}
                      errors={errors?.email}
                      placeholder='Nhập email của bạn'
                      className='block bg-white  w-full placeholder:text-sm px-3 py-2  text-black  text-lg border border-gray-300 rounded-lg'
                      classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1  text-left'
                    />
                  </div>
                  {sendOtpMutation.isPending ? (
                    <div className='uppercase text-white block w-full p-2 transition-all duration-500 text-lg rounded-full  focus:outline-none  bg-gray-500 first-letter:focus:outline-none'>
                      <div className='flex justify-center items-center'>
                        <Loading
                          className='w-10 mx-1 flex justify-center items-center'
                          classNameSpin='inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600'
                        />
                        Loading...
                      </div>
                    </div>
                  ) : (
                    <button
                      type='submit'
                      className='uppercase text-white block w-full p-2 transition-all duration-500 text-lg rounded-full bg-orange-700 hover:bg-orange-600 focus:outline-none'
                    >
                      Gửi email
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </MotionWrapper>
  )
}
