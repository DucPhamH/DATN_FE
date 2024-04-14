import { Link, useNavigate } from 'react-router-dom'
import InputPass from '../../components/InputComponents/InputPass'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLoginAdmin } from '../../utils/rules'
import Input from '../../components/InputComponents/Input'
import { useMutation } from '@tanstack/react-query'
import { loginAdminAccount } from '../../apis/authApi'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Loading from '../../components/GlobalComponents/Loading'

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLoginAdmin)
  })
  const loginAccountAdminMutation = useMutation({
    mutationFn: (body) => loginAdminAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountAdminMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.result.user)
        navigate('/home')
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          console.log(formError)
          if (formError?.user_name) {
            setError('user_name', {
              message: formError.user_name.msg,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password.msg,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-20 rounded-lg mx-auto lg:bg-white'>
      <h1 className='my-6'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Đăng nhập quản trị</div>
      </h1>
      <form onSubmit={onSubmit} noValidate>
        <Input
          title='Tên tài khoản của bạn'
          className='block bg-white w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
          placeholder='Nhập tên tài khoản của bạn'
          register={register}
          errors={errors.user_name}
          type='text'
          name='user_name'
          id='user_name'
        />
        <InputPass
          title='Mật khẩu của bạn'
          placeholder='Nhập mật khẩu của bạn'
          register={register}
          errors={errors.password}
          name='password'
        />
        <div className='text-right text-sm'>
          <Link className='ml-1 text-blue-400 hover:underline hover:text-red-700' to='/login'>
            Trở lại trang đăng nhập người dùng
          </Link>
        </div>
        <div className='px-4 rounded-full pt-4'>
          {loginAccountAdminMutation.isPending ? (
            <div className='block w-full p-2 transition-all duration-500 mt-3 text-lg rounded-full bg-gray-500 first-letter:focus:outline-none'>
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
              className='uppercase block w-full p-2 transition-all duration-500 mt-3 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none'
            >
              Đăng nhập
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
