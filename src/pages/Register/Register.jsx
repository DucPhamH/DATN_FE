import { Link, useNavigate } from 'react-router-dom'
import InputPass from '../../components/InputComponents/InputPass'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '../../components/InputComponents/Input'
import { schemaRegister } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/authApi'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { toast } from 'react-toastify'
import Loading from '../../components/GlobalComponents/Loading'

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaRegister)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Đăng kí thành công')
        navigate('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          if (formError?.name) {
            setError('name', {
              message: formError.name.msg,
              type: 'Server'
            })
          }
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
  return (
    <form
      className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-10 rounded-lg mx-auto lg:bg-white'
      onSubmit={onSubmit}
      noValidate
    >
      <h1 className='my-3'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Đăng kí</div>
      </h1>
      <Input
        title='Your name'
        placeholder='Your name'
        register={register}
        errors={errors.name}
        type='text'
        name='name'
        id='name'
      />
      <Input
        title='Your email'
        placeholder='Email'
        register={register}
        errors={errors.email}
        type='email'
        name='email'
        id='email'
      />
      <InputPass
        title='Your password'
        placeholder='Password'
        register={register}
        errors={errors.password}
        name='password'
      />
      <InputPass
        title='Your confirm password'
        placeholder='Confirm password'
        register={register}
        errors={errors.confirm_password}
        name='confirm_password'
      />
      <div className='px-4 pb-4 rounded-full pt-4'>
        {registerAccountMutation.isPending ? (
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
          <button className='uppercase block w-full transition-all duration-500 p-2 mt-3 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none'>
            sign up
          </button>
        )}

        <div className='text-gray-500 flex justify-center items-center mt-2 '>
          <span className='text-gray-400'>Bạn đã có tài khoản?</span>
          <Link className='ml-1 text-red-400 hover:underline hover:text-red-700' to='/login'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  )
}
