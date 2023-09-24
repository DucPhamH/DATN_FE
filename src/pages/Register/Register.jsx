import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <form
      className='sm:w-2/3 w-full px-4 lg:px-5 lg:py-20 rounded-lg mx-auto lg:bg-white'
      //   onSubmit={onSubmit}
      noValidate
    >
      <h1 className='my-6'>
        <div className='w-auto h-3 sm:h-4 inline-flex text-4xl lg:text-red-700 font-bold'>Đăng kí</div>
      </h1>
      <div className='pb-2 flex flex-col justify-start'>
        <label className='text-red-900 text-left italic '> Your Email</label>
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='block w-full px-3 py-2 text-lg text-black border border-gray-300 rounded-lg '
          //   {...register('email')}
        />
        <div className='flex min-h-[1rem] text-xs text-red-600'> {/* {errors.email?.message} */}</div>
      </div>
      <div className='pb-2 flex flex-col justify-start'>
        <label className='text-red-900 text-left italic'> Your password</label>
        <input
          className='block w-full px-3 py-2 text-lg text-black border border-gray-300 rounded-lg'
          type='password'
          placeholder='Password'
          autoComplete='on'
          //   {...register('password')}
        />
        <div className='flex min-h-[1rem] text-xs 9'> {/* {errors.email?.message} */}</div>
      </div>
      <div className='pb-2 flex flex-col justify-start'>
        <label className='text-red-900 text-left italic'> Your confirm password</label>
        <input
          className='block w-full px-3 py-2 text-lg text-black border border-gray-300 rounded-lg'
          type='password'
          placeholder='Confirm Password'
          autoComplete='on'
          //   {...register('confirm_password')}
        />
        <div className='flex min-h-[1rem] text-xs text-red-600'> {/* {errors.email?.message} */}</div>
      </div>
      <div className='px-4 pb-4 rounded-full pt-4'>
        <button className='uppercase block w-full transition-all duration-500 p-2 mt-3 text-lg rounded-full bg-orange-500 hover:bg-orange-600 focus:outline-none'>
          sign up
        </button>
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
