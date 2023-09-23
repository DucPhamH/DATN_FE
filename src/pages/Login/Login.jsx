import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <form
      className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-20 rounded-lg mx-auto lg:bg-white'
      //   onSubmit={onSubmit}
      noValidate
    >
      <h1 className='my-6 pb-10'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Login</div>
      </h1>
      <div className='pb-2'>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          className='block w-full p-3  text-black text-lg border border-gray-300 rounded-lg '
          //   {...register('email')}
        />
        <div className='mt-1 flex min-h-[1.5rem] text-red-600'> {/* {errors.email?.message} */}</div>
      </div>
      <div className='pb-2'>
        <input
          className='block w-full p-3 text-black text-lg border border-gray-300 rounded-lg'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          autoComplete='on'
          //   {...register('password')}
        />
        <div className='mt-1 flex min-h-[1.5rem] text-red-600'> {/* {errors.email?.message} */}</div>
      </div>
      <div className='text-right text-gray-500 flex  '>
        <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
        <Link className='ml-1 text-red-400 hover:underline hover:text-red-700' to='/register'>
          Đăng ký
        </Link>
      </div>
      <div className='px-4 pb-4 rounded-full pt-4'>
        <button className='uppercase block w-full p-2 mt-3 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none'>
          sign in
        </button>
      </div>
    </form>
  )
}
