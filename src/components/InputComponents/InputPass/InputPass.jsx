import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function InputPass({
  title,
  placeholder,
  register = () => {},
  errors,
  name,
  className = 'block bg-white dark:bg-slate-800 dark:border-none w-full placeholder:text-sm px-3 py-2  text-black dark:text-gray-400 text-lg border border-gray-300 rounded-lg',
  classNameLabel = 'text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'
}) {
  const [showPass, setShowPass] = useState(false)

  const onShowPass = () => {
    setShowPass(!showPass)
  }

  return (
    <div className='pb-2 relative flex flex-col justify-start'>
      <label className={classNameLabel}> {title}</label>
      <input
        className={className}
        type={showPass === false ? 'password' : 'text'}
        name='password'
        placeholder={placeholder}
        autoComplete='on'
        {...register(`${name}`)}
      />
      <div
        onClick={() => onShowPass()}
        className='absolute right-3 top-[40%] text-gray-600 text-xl hover:text-red-700 cursor-pointer'
      >
        {showPass === false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
      <div className='flex min-h-[1rem] font-medium text-orange-300 text-xs lg:text-red-600'> {errors?.message}</div>
    </div>
  )
}
