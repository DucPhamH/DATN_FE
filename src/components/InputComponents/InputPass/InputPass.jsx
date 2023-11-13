import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function InputPass({ title, placeholder }) {
  const [showPass, setShowPass] = useState(false)

  const onShowPass = () => {
    setShowPass(!showPass)
  }

  return (
    <div className='pb-2 relative flex flex-col justify-start'>
      <label className='text-gray-400 lg:text-red-900 text-left italic'> {title}</label>
      <input
        className=' w-full placeholder:text-sm px-3 py-2 text-black text-lg border border-gray-300 rounded-lg'
        type={showPass === false ? 'password' : 'text'}
        name='password'
        placeholder={placeholder}
        autoComplete='on'
        //   {...register('password')}
      />
      <div
        onClick={() => onShowPass()}
        className='absolute right-3 top-[40%] text-gray-600 text-xl hover:text-red-700 cursor-pointer'
      >
        {showPass === false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
      <div className='flex min-h-[1rem] text-xs text-red-600'> {/* {errors.email?.message} */}</div>
    </div>
  )
}
