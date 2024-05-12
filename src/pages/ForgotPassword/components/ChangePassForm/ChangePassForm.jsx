import { useNavigate } from 'react-router-dom'
import InputPass from '../../../../components/InputComponents/InputPass'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPassword } from '../../../../apis/authApi'
import { useMutation } from '@tanstack/react-query'
import { schemaResetPassword } from '../../../../utils/rules'
import useQueryConfig from '../../../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import Loading from '../../../../components/GlobalComponents/Loading'

export default function ChangePassForm() {
  const navigate = useNavigate()
  const queryConfig = omit(useQueryConfig(), ['page', 'sort'])
  console.log(queryConfig)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaResetPassword)
  })
  const resetPasswordMutation = useMutation({
    mutationFn: (body) => resetPassword(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)

    const newData = {
      new_password: data.new_password,
      email: queryConfig.email,
      otp_code: queryConfig.otp_code
    }

    console.log(newData)

    resetPasswordMutation.mutate(newData, {
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          if (formError?.new_password) {
            setError('new_password', {
              message: formError.new_password.msg || error?.response?.data?.message,
              type: 'Server'
            })
          }
        }
      },
      onSuccess: (data) => {
        console.log(data)
        navigate('/forgot-password/success')
      }
    })
  })
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
              <h1 className='block text-2xl font-bold text-gray-800 '>Đổi mật khẩu</h1>
            </div>
            <div className='mt-5'>
              <form onSubmit={onSubmit}>
                <div className='grid gap-y-4'>
                  <div>
                    <InputPass
                      title='Mật khẩu mới của bạn'
                      className='block bg-white w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
                      classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1  text-left'
                      placeholder='Nhập mật khẩu mới của bạn'
                      name='new_password'
                      register={register}
                      errors={errors.new_password}
                    />
                    <InputPass
                      title='Xác nhận mật khẩu'
                      className='block bg-white w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
                      classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1  text-left'
                      placeholder='Nhập lại mật khẩu của bạn'
                      name='confirm_password'
                      register={register}
                      errors={errors.confirm_password}
                    />
                  </div>
                  {resetPasswordMutation.isPending ? (
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
                      Xác nhận
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
