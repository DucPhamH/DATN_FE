import { Link, useNavigate } from 'react-router-dom'
import InputPass from '../../components/InputComponents/InputPass'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLogin } from '../../utils/rules'
import Input from '../../components/InputComponents/Input'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '../../apis/authApi'
// import toast from 'react-hot-toast'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Loading from '../../components/GlobalComponents/Loading'
import { queryClient } from '../../main'
import toast from 'react-hot-toast'

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLogin)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.result.user)
        navigate('/home')
        toast.success(data.data.message)
        queryClient.invalidateQueries('me')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          console.log(formError)
          if (formError?.email) {
            setError('email', {
              message: formError.email.msg,
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

  const getGoogleAuthUrl = () => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
    const url = `https://accounts.google.com/o/oauth2/v2/auth`
    const query = {
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      prompt: 'consent',
      access_type: 'offline'
    }
    const queryString = new URLSearchParams(query).toString()
    return `${url}?${queryString}`
  }
  const googleOAuthUrl = getGoogleAuthUrl()

  return (
    <div className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-16 rounded-lg mx-auto lg:bg-white'>
      <h1 className='my-6'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Đăng nhập</div>
      </h1>
      <form onSubmit={onSubmit} noValidate>
        <Input
          title='Email của bạn'
          className='block bg-white w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
          classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1  text-left'
          placeholder='Nhập email của bạn'
          register={register}
          errors={errors.email}
          type='email'
          name='email'
          id='email'
        />
        <InputPass
          title='Mật khẩu của bạn'
          className='block bg-white w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
          classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 text-left'
          placeholder='Nhập mật khẩu của bạn'
          register={register}
          errors={errors.password}
          name='password'
        />
        <div className='flex justify-end text-sm'>
          {/* <Link className='text-red-600 font-medium hover:underline hover:text-red-700' to='/login/admin'>
            Đăng nhập admin
          </Link>
          <span className='font-medium text-black mx-1'>|</span> */}
          <Link className='text-blue-400 font-medium hover:underline hover:text-red-700' to='/forgot-password'>
            Quên mật khẩu ?
          </Link>
        </div>
        <div className='px-4 rounded-full pt-2'>
          {loginAccountMutation.isPending ? (
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
      <div className='px-4 pb-4 rounded-full'>
        <Link
          to={googleOAuthUrl}
          className='px-4 py-3 mt-4 border flex justify-center items-center gap-2 border-slate-200 rounded-full w-full text-gray-400 font-semiboldhover:border-slate-400 hover:text-red-600 hover:shadow transition duration-150'
        >
          <img
            className='w-6 h-6'
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            loading='lazy'
            alt='google logo'
          />
          <span>Login with Google</span>
        </Link>
        <div className='text-gray-500 flex justify-center items-center mt-2 '>
          <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
          <Link className='ml-1 font-medium text-red-400 hover:underline hover:text-red-700' to='/register'>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )
}
