import React from 'react'
import { Link } from 'react-router-dom'
import InputPass from '../../components/InputComponents/InputPass'

export default function Login() {
  return (
    <form
      className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-20 rounded-lg mx-auto lg:bg-white'
      //   onSubmit={onSubmit}
      noValidate
    >
      <h1 className='my-6'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Đăng nhập</div>
      </h1>
      <div className='pb-2 flex flex-col justify-start'>
        <label className='text-gray-400 lg:text-red-900 text-left italic'> Your email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          className='block w-full px-3 py-2  text-black text-lg border border-gray-300 rounded-lg '
          //   {...register('email')}
        />
        <div className='flex min-h-[1rem] text-xs text-red-600'> {/* {errors.email?.message} */}</div>
      </div>
      <InputPass />
      <div className='text-right text-sm'>
        <Link className='ml-1 text-blue-400 hover:underline hover:text-red-700' to='/forgot-password'>
          Quên mật khẩu ?
        </Link>
      </div>

      <div className='px-4 pb-4 rounded-full pt-4'>
        <button className='uppercase block w-full p-2 transition-all duration-500 mt-3 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none'>
          sign in
        </button>
        <button className='px-4 py-3 mt-4 border flex justify-center items-center gap-2 border-slate-200 rounded-full w-full text-gray-400 font-semiboldhover:border-slate-400 hover:text-red-600 hover:shadow transition duration-150'>
          <img
            className='w-6 h-6'
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            loading='lazy'
            alt='google logo'
          />
          <span>Login with Google</span>
        </button>
        <div className='text-gray-500 flex justify-center items-center mt-2 '>
          <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
          <Link className='ml-1 text-red-400 hover:underline hover:text-red-700' to='/register'>
            Đăng ký
          </Link>
        </div>
      </div>
    </form>
  )
}
